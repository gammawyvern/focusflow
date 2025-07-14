# 🚀 Project Spin-Up Checklist (.NET 8 MVC)

This is the step-by-step guide to spin up your ASP.NET Core MVC project with Webpack, base styling, and EF Core.

---

## ✅ 1. Create Base .NET 8 MVC Project

- [x] Use Rider’s **Web App (Model-View-Controller)** template
- [x] Target **.NET 8.0**
- [x] Set the same name for solution and project (e.g., `FocusFlow`)
- [x] Initialize Git repository

---

## ✅ 2. Clean Out Boilerplate

- [x] Remove default `Privacy` view/controller
- [x] Clean `_Layout.cshtml` (remove nav links, footer, etc.)
- [x] Remove unused default styles/scripts
- [x] Delete dummy content from views

---

## ✅ 3. Add "Under Construction" Message

- [x] Edit `Views/Home/Index.cshtml`
- [x] Add centered “🚧 Under Construction” message

---

## ✅ 4. Set Up Webpack

- [x] Create `/client-ui` directory with `js` and `css` endpoints
- [x] Run `npm init`
- [x] Install Webpack and loaders:
  ```bash
  npm install --save-dev webpack webpack-cli css-loader style-loader
  ```
- [x] Create Webpack Config File

## ✅ 5. Create Base Styles
- [x] Typography
- [x] Components
- [x] Form Inputs

## ✅ 6. Setup EF Core
- [ ] ?

## Optional
- [ ] Typescript
- [ ] Sass
