from http.server import BaseHTTPRequestHandler, HTTPServer
import json

class SimpleHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            with open("accordion_data.json", "r") as f:
                data = json.load(f)
        except FileNotFoundError:
            # Якщо файл не існує, створюємо його з пустим масивом
            data = []
            with open("accordion_data.json", "w") as f:
                json.dump(data, f)
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Access-Control-Allow-Origin", "*") 
        self.end_headers()
        self.wfile.write(json.dumps(data).encode("utf-8"))


    def do_POST(self):
        # Обробка POST-запитів для збереження даних
        if self.path == "/accordion":
            content_length = int(self.headers["Content-Length"])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)

            with open("accordion_data.json", "w") as f:
                json.dump(data, f)
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.send_header("Access-Control-Allow-Origin", "*") 
            self.end_headers()
            self.wfile.write(b"Data saved successfully")

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

if __name__ == "__main__":
    server_address = ("", 8000)
    httpd = HTTPServer(server_address, SimpleHTTPRequestHandler)
    print("Server running on port 8000...")
    httpd.serve_forever()
