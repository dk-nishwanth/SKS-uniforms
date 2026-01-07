// API Service for SKS Uniforms
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  // Contact API
  async submitContactForm(formData) {
    return this.request('/contact', {
      method: 'POST',
      body: JSON.stringify(formData),
    });
  }

  async submitEnquiry(enquiryData) {
    return this.request('/contact/enquiry', {
      method: 'POST',
      body: JSON.stringify(enquiryData),
    });
  }

  async requestQuote(quoteData) {
    return this.request('/contact/quote', {
      method: 'POST',
      body: JSON.stringify(quoteData),
    });
  }

  async requestSamples(sampleData) {
    return this.request('/contact/samples', {
      method: 'POST',
      body: JSON.stringify(sampleData),
    });
  }

  async bookConsultation(consultationData) {
    return this.request('/contact/consultation', {
      method: 'POST',
      body: JSON.stringify(consultationData),
    });
  }

  // Product API
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id) {
    return this.request(`/products/${id}`);
  }

  async getFeaturedProducts(limit = 10) {
    return this.request(`/products/featured?limit=${limit}`);
  }

  async getBestSellers(limit = 10) {
    return this.request(`/products/bestsellers?limit=${limit}`);
  }

  async getProductsByCategory(category, params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/products/categories/${category}${queryString ? `?${queryString}` : ''}`);
  }

  async searchProducts(query, params = {}) {
    const searchParams = { search: query, ...params };
    const queryString = new URLSearchParams(searchParams).toString();
    return this.request(`/products?${queryString}`);
  }

  async getSearchSuggestions(query) {
    return this.request(`/products/search/suggestions?q=${encodeURIComponent(query)}`);
  }

  async getFilterOptions() {
    return this.request('/products/filters/options');
  }

  // Newsletter API
  async subscribeNewsletter(subscriptionData) {
    return this.request('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscriptionData),
    });
  }

  async unsubscribeNewsletter(email, reason) {
    return this.request('/newsletter/unsubscribe', {
      method: 'POST',
      body: JSON.stringify({ email, reason }),
    });
  }

  async updateNewsletterPreferences(preferencesData) {
    return this.request('/newsletter/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferencesData),
    });
  }

  // Order API
  async createOrder(orderData) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getOrder(orderId) {
    return this.request(`/orders/${orderId}`);
  }

  async getOrders(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    return this.request(`/orders${queryString ? `?${queryString}` : ''}`);
  }

  // Auth API
  async register(userData) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async login(credentials) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async guestLogin(guestData) {
    return this.request('/auth/guest-login', {
      method: 'POST',
      body: JSON.stringify(guestData),
    });
  }

  // Health Check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();