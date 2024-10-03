import React from 'react'

export const Footer = () => {
  return (
    <footer className="py-6 bg-gray-900 text-white text-center">
      <div className="container mx-auto px-4">
        <div className="space-y-4">
          <p>&copy; {new Date().getFullYear()} MAPL-TVS. All rights reserved.</p>
          <div>
            <a href="#home" className="text-red-500 hover:text-red-700 mx-2">Home</a>
            <a href="#features" className="text-red-500 hover:text-red-700 mx-2">Features</a>
            <a href="#models" className="text-red-500 hover:text-red-700 mx-2">Models</a>
            <a href="#faq" className="text-red-500 hover:text-red-700 mx-2">FAQ</a>
            <a href="#contact" className="text-red-500 hover:text-red-700 mx-2">Contact</a>
          </div>
        </div>
      </div>
    </footer>  )
}
