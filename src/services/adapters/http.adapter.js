import axios from 'axios'
import app from '@/main'
import config from '@/config/app.config'
import NotificationService from '@/services/notification.service'

class HttpAdapter {
  constructor (progressbar) {
    this.progressbar = progressbar
  }
  http () {
    const http = axios.create({
      baseURL: config.api_url || '',
      headers: {
        'Content-type': 'application/json'
      }
    })
    http.interceptors.request.use(
      (request) => {
        const token = localStorage.getItem('token');
    
        if (
          typeof request.hideLoading === 'undefined' ||
          !request.hideLoading
        ) {
          this.progressbar.start();
        }
    
        // Add the Authorization header if a token is available
        if (token) {
  

          request.headers['Authorization'] = `Bearer ${token}`;
        }
    
        return request;
      },
      (error) => {
        this.progressbar.finish();
    
        NotificationService.error('Network error. Check your connection');
        // Suppress the error here
        return Promise.resolve();
      }
    );

    http.interceptors.response.use(
      response => {
        this.progressbar.finish()

        return response
      },
      error => {
        this.progressbar.finish()

        // Server down
        if (error.response.status >= 500) {
          NotificationService.error('Server Unavailable.')
          return Promise.reject(error)
        }

        return Promise.reject(error)
      }
    )

    
    return http
  }
}

export default HttpAdapter
