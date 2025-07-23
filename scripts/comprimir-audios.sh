#!/bin/bash

CARPETA="./audios"  # Cambia si tus audios están en otro lugar
SALIDA="$CARPETA/comprimidos"
BITRATE="128k"      # Puedes reducirlo aún más: 96k, 64k...

mkdir -p "$SALIDA"

for audio in "$CARPETA"/*.{mp3,wav,m4a,aac,ogg,flac}; do
  [ -f "$audio" ] || continue

  nombre=$(basename "$audio")
  nombre_sin_ext="${nombre%.*}"
  salida="$SALIDA/${nombre_sin_ext}.mp3"

  echo "🔊 Comprimiendo $nombre -> $salida"

  ffmpeg -i "$audio" -b:a $BITRATE -y "$salida"
done

echo "✅ Todos los audios fueron comprimidos y guardados en '$SALIDA'"
