# Cómo publicar la app para que Karen la vea desde cualquier dispositivo

La app es solo archivos HTML/CSS/JS. No necesita servidor propio ni base de datos. La forma más fácil es GitHub Pages (gratis).

> Ojo: GitHub publica **la app**, no las notas de Karen. Sus notas se guardan en el navegador de ella. Si cambia de dispositivo, use **Exportar progreso** e **Importar progreso**.

---

## Opción A: GitHub Pages (recomendada)

### 1. Crear cuenta

Si no tienes cuenta, entra a https://github.com/signup y crea una. Anota tu **usuario de GitHub** (ejemplo: `juanperez`), porque va en el link final.

### 2. Crear el repositorio

1. Entra a https://github.com/new.
2. En **Repository name** escribe: `malla-karen` (todo en minúsculas).
3. Deja **Public** seleccionado.
4. **No** marques “Add a README file”, ni licence, ni .gitignore. Déjalo vacío.
5. Haz clic en **Create repository**.

### 3. Subir los archivos

1. Dentro del repo recién creado, haz clic en **Add file → Upload files**.
2. Arrastra estos archivos desde la carpeta `malla-derecho-app`:
   - `karen.html`
   - `index.html`
   - `styles.css`
   - `data.js`
   - `app.js`
   - `perfil-karen.js`
   - `README.md`
   - `PUBLICAR.md`
3. Haz clic en **Commit changes**.

> Sube los archivos sueltos, no la carpeta comprimida.

### 4. Activar Pages

1. En el repo, ve a **Settings** (engrane, arriba a la derecha).
2. En el menú lateral, haz clic en **Pages**.
3. En **Build and deployment**:
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` (o `master`, el que aparezca)
   - **Folder**: `/ (root)`
4. Haz clic en **Save**.

### 5. Esperar y abrir el link

Espera 1 o 2 minutos. Luego entra a:

```
https://TU_USUARIO.github.io/malla-karen/karen.html
```

Ejemplo: si tu usuario es `juanperez`:

```
https://juanperez.github.io/malla-karen/karen.html
```

Ese es el link que le mandas a Karen.

### 6. Si sale error 404

- Revisa que el archivo se llame exactamente `karen.html`.
- Revisa que en Pages el folder sea `/ (root)` y no `/docs`.
- Espera un poco más: la primera publicación puede tardar unos minutos.
- Recarga con `Ctrl + F5`.

---

## Opción B: Netlify Drop (más rápido, sin cuenta de GitHub)

1. Comprime la carpeta `malla-derecho-app` en un ZIP (ya te dejé `malla-derecho-app.zip`).
2. Entra a https://app.netlify.com/drop.
3. Arrastra el ZIP a la página.
4. Netlify te da un link tipo `https://random-name-123.netlify.app`.
5. El link de Karen será:
   ```
   https://random-name-123.netlify.app/karen.html
   ```
6. Puedes cambiar el nombre del sitio en **Site settings → Change site name**.

---

## Actualizar la app después

### En GitHub

- Entra al repo, haz clic en el archivo, ícono de lápiz, editas y haces **Commit**.
- O sube otra vez los archivos con **Add file → Upload files**.
- Espera un momento y recarga el link.

### En Netlify

- Arrastra un ZIP nuevo al mismo sitio, o conecta el repo de GitHub para que se actualice solo.

---

## Cambiar el año o los semestres de Karen

Edita `perfil-karen.js`:

```js
anioTexto: "4° año · 2027",
semestresAprobados: [1, 2, 3, 4, 5, 6],
semestresCursando: [7, 8],
```

Si, por ejemplo, ya aprobó el semestre 7, cámbialo así:

```js
semestresAprobados: [1, 2, 3, 4, 5, 6, 7],
semestresCursando: [8],
```

Luego vuelve a subir ese archivo.

---

## Privacidad

GitHub Pages con repo público significa que **cualquier persona con el link ve la app**. No hay usuario ni contraseña. Si quieres que sea privado, dime y lo pasamos a Netlify con contraseña u otra opción.
