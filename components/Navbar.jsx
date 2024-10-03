"use client"

import React from 'react'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-10 bg-white bg-opacity-10 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-red-500 text-2xl font-bold">MAPL-TVS</div>
        <ul className="flex space-x-6">
          <li>
            <a href="#home" className="text-red-500 hover:text-red-700">Home</a>
          </li>
          <li>
            <a href="#features" className="text-red-500 hover:text-red-700">Features</a>
          </li>
          <li>
            <a href="#models" className="text-red-500 hover:text-red-700">Models</a>
          </li>
          <li>
            <a href="#faq" className="text-red-500 hover:text-red-700">FAQ</a>
          </li>
          <li>
            <a href="#contact" className="text-red-500 hover:text-red-700">Contact</a>
          </li>
        </ul>
      </div>
    </nav>  )
}
