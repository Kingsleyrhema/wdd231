#!/usr/bin/env python3
"""
Custom HTTP server with proper cache headers for Lighthouse testing
"""
import http.server
import socketserver
import os
from urllib.parse import urlparse

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add cache headers for static assets
        path = urlparse(self.path).path
        
        # Define cache rules
        if path.endswith(('.jpg', '.jpeg', '.png', '.webp', '.gif')):
            # Images: 1 year cache
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        elif path.endswith(('.css', '.js')):
            # CSS/JS: 1 year cache
            self.send_header('Cache-Control', 'public, max-age=31536000, immutable')
        elif path.endswith(('.html', '.htm')):
            # HTML: no cache for dynamic content
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        else:
            # Default: 1 hour cache
            self.send_header('Cache-Control', 'public, max-age=3600')
        
        # Add security headers
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'DENY')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        
        super().end_headers()

if __name__ == "__main__":
    PORT = 8000
    
    with socketserver.TCPServer(("", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"Server running at http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.") 