import React from 'react'
import { useContext } from 'react';
import { LanguageContext } from "../../context/LanguageContext";
import useTranslateLanding from "../../hooks/useTranslateLanding";
function Stories() {
   const { lang } = useContext(LanguageContext);
    const tStoriesTitle = useTranslateLanding("stories_title", lang);
    const tStoriesSubtitle = useTranslateLanding("stories_subtitle", lang);
    const tTestimonial1 = useTranslateLanding("testimonial_1", lang);
    const tTestimonial2 = useTranslateLanding("testimonial_2", lang);
    const tTestimonial3 = useTranslateLanding("testimonial_3", lang);
  return (
    <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {tStoriesTitle}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {tStoriesSubtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial Card 1 */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-start mb-4">
                <svg
                  className="w-10 h-10 text-green-500 mr-2 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.199 15.602c-.31-.309-.499-.728-.499-1.157 0-.429.189-.848.499-1.157L11.528 11h-3.329c-.482 0-.875-.393-.875-.875 0-.482.393-.875.875-.875h4.204c.31 0 .605.123.824.342l4.897 4.897c.31.31.488.729.488 1.157 0 .428-.178.847-.488 1.157l-4.204 4.204c-.31.31-.729.488-1.157.488-.428 0-.847-.178-1.157-.488L9.199 15.602z" />
                </svg>
                <svg
                  className="w-10 h-10 text-green-500 ml-auto opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.801 8.398c.31.309.499.728.499 1.157 0 .429-.189.848-.499 1.157L12.472 13h3.329c.482 0 .875.393.875.875 0 .482-.393.875-.875.875h-4.204c-.31 0-.605-.123-.824-.342l-4.897-4.897c-.31-.31-.488-.729-.488-1.157 0-.428.178-.847.488-1.157l4.204-4.204c.31-.31.729-.488 1.157-.488.428 0 .847.178 1.157.488L14.801 8.398z" />
                </svg>
              </div>
              <p className="text-gray-700 italic text-lg mb-6">
                {tTestimonial1}
              </p>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Mumbai</p>
                </div>
                <div className="flex text-yellow-400 text-2xl">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>

            {/* Testimonial Card 2 */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-start mb-4">
                <svg
                  className="w-10 h-10 text-green-500 mr-2 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.199 15.602c-.31-.309-.499-.728-.499-1.157 0-.429.189-.848.499-1.157L11.528 11h-3.329c-.482 0-.875-.393-.875-.875 0-.482.393-.875.875-.875h4.204c.31 0 .605.123.824.342l4.897 4.897c.31.31.488.729.488 1.157 0 .428-.178.847-.488 1.157l-4.204 4.204c-.31.31-.729.488-1.157.488-.428 0-.847-.178-1.157-.488L9.199 15.602z" />
                </svg>
                <svg
                  className="w-10 h-10 text-green-500 ml-auto opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.801 8.398c.31.309.499.728.499 1.157 0 .429-.189.848-.499 1.157L12.472 13h3.329c.482 0 .875.393.875.875 0 .482-.393.875-.875.875h-4.204c-.31 0-.605-.123-.824-.342l-4.897-4.897c-.31-.31-.488-.729-.488-1.157 0-.428.178-.847.488-1.157l4.204-4.204c.31-.31.729-.488 1.157-.488.428 0 .847.178 1.157.488L14.801 8.398z" />
                </svg>
              </div>
              <p className="text-gray-700 italic text-lg mb-6">
                {tTestimonial2}
              </p>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Rajiv Kumar</p>
                  <p className="text-sm text-gray-500">Delhi</p>
                </div>
                <div className="flex text-yellow-400 text-2xl">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>

            {/* Testimonial Card 3 */}
            <div className="bg-white rounded-xl shadow-lg p-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="flex items-start mb-4">
                <svg
                  className="w-10 h-10 text-green-500 mr-2 opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9.199 15.602c-.31-.309-.499-.728-.499-1.157 0-.429.189-.848.499-1.157L11.528 11h-3.329c-.482 0-.875-.393-.875-.875 0-.482.393-.875.875-.875h4.204c.31 0 .605.123.824.342l4.897 4.897c.31.31.488.729.488 1.157 0 .428-.178.847-.488 1.157l-4.204 4.204c-.31.31-.729.488-1.157.488-.428 0-.847-.178-1.157-.488L9.199 15.602z" />
                </svg>
                <svg
                  className="w-10 h-10 text-green-500 ml-auto opacity-60"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.801 8.398c.31.309.499.728.499 1.157 0 .429-.189.848-.499 1.157L12.472 13h3.329c.482 0 .875.393.875.875 0 .482-.393.875-.875.875h-4.204c-.31 0-.605-.123-.824-.342l-4.897-4.897c-.31-.31-.488-.729-.488-1.157 0-.428.178-.847.488-1.157l4.204-4.204c.31-.31.729-.488 1.157-.488.428 0 .847.178 1.157.488L14.801 8.398z" />
                </svg>
              </div>
              <p className="text-gray-700 italic text-lg mb-6">
                {tTestimonial3}
              </p>
              <div className="flex items-center">
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Anjali Mehta</p>
                  <p className="text-sm text-gray-500">Bengaluru</p>
                </div>
                <div className="flex text-yellow-400 text-2xl">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Stories
