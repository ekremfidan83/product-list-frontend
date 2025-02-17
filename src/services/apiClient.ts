export const apiClient = {
  fetch: async (url: string, options?: RequestInit) => {
    const defaultHeaders = {
      'Content-Type': 'application/json',
      // İsterseniz Authorization header'ı ekleyebilirsiniz
      // 'Authorization': `Bearer ${getToken()}`
    };

    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
    });

    const data = await response.json();
    return { response, data };
  }
}; 