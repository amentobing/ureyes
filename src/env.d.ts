/// <reference types="astro/client" />
import type { ObjectId } from "mongodb"; // Contoh import kamu

declare global {
  namespace App {
    interface Locals {
      prompt: string;
      userData: {
        _id: ObjectId;
        email: string;
        username: string;
        password: string;
        urlProfile: string;
      };
    }
  }
}

export {};
