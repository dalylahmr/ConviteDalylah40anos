#!/usr/bin/env python3
"""
Servidor do Totem Fotográfico — Dalylah 40 Anos
Serve os arquivos estáticos e recebe uploads de fotos via POST /save-photo

Uso:
    python3 server.py [porta]

Padrão: porta 8080
"""

import os
import sys
import cgi
import json
import datetime
from http.server import HTTPServer, SimpleHTTPRequestHandler

FOTOS_DIR = "fotos"
os.makedirs(FOTOS_DIR, exist_ok=True)


class TotemHandler(SimpleHTTPRequestHandler):

    def do_POST(self):
        if self.path == "/save-photo":
            self._save_photo()
        else:
            self.send_error(404, "Endpoint não encontrado")

    def _save_photo(self):
        try:
            content_type = self.headers.get("Content-Type", "")

            # Determina o boundary para multipart/form-data
            if "multipart/form-data" in content_type:
                form = cgi.FieldStorage(
                    fp=self.rfile,
                    headers=self.headers,
                    environ={
                        "REQUEST_METHOD": "POST",
                        "CONTENT_TYPE": content_type,
                    }
                )
                if "photo" in form:
                    field = form["photo"]
                    data = field.file.read()
                    filename = self._safe_filename(field.filename)
                else:
                    self._json_response(400, {"ok": False, "error": "Campo 'photo' não encontrado"})
                    return
            else:
                # Recebe raw bytes (JPEG)
                length = int(self.headers.get("Content-Length", 0))
                data = self.rfile.read(length)
                ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S_%f")
                filename = f"dalylah40-{ts}.jpg"

            path = os.path.join(FOTOS_DIR, filename)
            with open(path, "wb") as f:
                f.write(data)

            print(f"[foto] Salvo: {path} ({len(data)/1024:.1f} KB)")
            self._json_response(200, {"ok": True, "file": filename})

        except Exception as e:
            print(f"[erro] {e}")
            self._json_response(500, {"ok": False, "error": str(e)})

    def _safe_filename(self, name):
        # Remove caracteres perigosos
        if not name:
            ts = datetime.datetime.now().strftime("%Y%m%d_%H%M%S_%f")
            return f"dalylah40-{ts}.jpg"
        base = os.path.basename(name)
        safe = "".join(c for c in base if c.isalnum() or c in "._-")
        return safe or f"photo-{datetime.datetime.now().strftime('%f')}.jpg"

    def _json_response(self, code, data):
        body = json.dumps(data).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(body)

    def log_message(self, fmt, *args):
        # Formata o log de forma mais limpa
        ts = datetime.datetime.now().strftime("%H:%M:%S")
        print(f"[{ts}] {fmt % args}")


def main():
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080
    os.chdir(os.path.dirname(os.path.abspath(__file__)))

    server = HTTPServer(("0.0.0.0", port), TotemHandler)
    print("=" * 50)
    print("  Totem Fotográfico — Dalylah 40 Anos")
    print("=" * 50)
    print(f"  Servidor rodando em: http://localhost:{port}")
    print(f"  Totem:              http://localhost:{port}/totem-foto.html")
    print(f"  Fotos salvas em:    ./{FOTOS_DIR}/")
    print("  Pressione Ctrl+C para parar")
    print("=" * 50)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n[ok] Servidor encerrado.")


if __name__ == "__main__":
    main()
