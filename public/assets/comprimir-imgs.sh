#!/bin/bash

# Carpeta con las imágenes
CARPETA="./img"  # Cambia esto si tus imágenes están en otro lugar
CALIDAD_INICIAL=90    # Calidad inicial
CALIDAD_MINIMA=10     # Calidad mínima permitida
MAX_SIZE=500000       # Tamaño máximo en bytes (500 KB)

# Crear carpeta de salida
mkdir -p "$CARPETA/comprimidas"

for imagen in "$CARPETA"/*.{jpg,jpeg,png,JPG,JPEG,PNG,HEIC}; do
  [ -f "$imagen" ] || continue

  nombre_archivo=$(basename "$imagen")
  salida="$CARPETA/comprimidas/$nombre_archivo"

  calidad=$CALIDAD_INICIAL

  echo "Procesando $nombre_archivo..."

  # Comprimir en bucle hasta que esté por debajo de 500 KB o calidad mínima
  while true; do
    convert "$imagen" -quality $calidad "$salida"

    peso=$(stat -f%z "$salida")

    if [ "$peso" -le "$MAX_SIZE" ] || [ "$calidad" -le "$CALIDAD_MINIMA" ]; then
      echo " -> Comprimida con calidad $calidad: $peso bytes"
      break
    fi

    calidad=$((calidad - 5))
  done
done

echo "✅ Todas las imágenes fueron procesadas y guardadas en '$CARPETA/comprimidas'"
