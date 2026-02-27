# Sistema de Gestão Administrativa para Escritório de Advocacia

Projeto acadêmico desenvolvido no curso de Análise e Desenvolvimento de Sistemas.

## 📌 Descrição

Este projeto consiste no desenvolvimento de uma plataforma web para gestão administrativa de um escritório de advocacia, seguindo a abordagem MVP (Minimum Viable Product).

O sistema permite o gerenciamento de clientes, compromissos, controle financeiro básico e visualização de métricas através de um dashboard.

---

## 🎯 Objetivo

Desenvolver uma aplicação web com autenticação e controle de acesso por perfil, permitindo:

- Gestão de clientes
- Cadastro de compromissos
- Controle financeiro básico
- Dashboard com métricas administrativas

---

## 🏗 Arquitetura do Sistema

O sistema será dividido em:

### 🔹 Frontend
- React com Next.js
- Interface com Sidebar fixa
- Comunicação com API via HTTP (REST)

### 🔹 Backend
- Laravel (API REST)
- Autenticação com hash de senha (bcrypt)
- Controle de acesso por perfil (ADMIN e FUNCIONÁRIO)

### 🔹 Banco de Dados
- MySQL
- Estrutura relacional
