# AI-B2B-Marketplace

An AI-powered B2B marketplace platform designed to connect buyers and sellers through a secure, scalable, and intelligent digital marketplace.

The platform provides product management, secure authentication, cloud-based image storage, and AI-powered features aimed at improving product discovery, pricing, and business decision-making.

---

## 🚀 Project Overview

Traditional B2B marketplaces often require businesses to manually manage product listings, pricing, search, and analytics.

**AI-B2B-Marketplace** aims to automate and improve these processes by combining:

- Secure JWT-based authentication
- Role-based access for Buyers, Sellers, and Admins
- Product and inventory management
- AWS S3 cloud storage for product images
- AI-assisted product listing
- Intelligent pricing recommendations
- Semantic product search
- Business analytics
- AI-powered analytics assistance

The project is being developed as a full-stack application using **Java Spring Boot** and **Next.js**.

---

## 🎯 Objectives

- Build a secure B2B marketplace backend.
- Provide separate capabilities for buyers, sellers, and administrators.
- Allow sellers to create and manage product listings.
- Store product images securely using AWS S3.
- Implement JWT-based authentication and authorization.
- Introduce AI-powered assistance for product listings and pricing.
- Improve product discovery using semantic search.
- Provide analytics to support business decisions.
- Build a scalable cloud-ready architecture.

---

## 🛠️ Technology Stack

### Backend

- Java 17
- Spring Boot 4.1.1
- Spring Web
- Spring Data JPA
- Spring Security
- JWT
- Hibernate
- Maven

### Database

- PostgreSQL

### Frontend

- Next.js
- React
- TypeScript
- CSS

### Cloud & AWS

- AWS S3
- AWS RDS PostgreSQL
- AWS Lambda
- AWS SQS
- AWS CloudFront

### AI

- AI-powered listing assistance
- AI price recommendations
- Semantic search
- Embeddings
- Analytics Copilot

---

## 🏗️ Architecture

```text
                    ┌──────────────────────┐
                    │      Next.js         │
                    │      Frontend        │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Spring Boot       │
                    │      Backend         │
                    └──────────┬───────────┘
                               │
             ┌─────────────────┼─────────────────┐
             │                 │                 │
             ▼                 ▼                 ▼
      ┌────────────┐    ┌────────────┐    ┌────────────┐
      │ PostgreSQL │    │   Spring   │    │  AWS S3    │
      │  Database  │    │  Security  │    │   Images   │
      └────────────┘    └────────────┘    └────────────┘
                               │
                               ▼
                        ┌──────────────┐
                        │     JWT      │
                        │Authentication│
                        └──────────────┘

                               │
                               ▼
                        ┌──────────────┐
                        │  AI Services │
                        │ Search/Price │
                        │  Analytics   │
                        └──────────────┘
