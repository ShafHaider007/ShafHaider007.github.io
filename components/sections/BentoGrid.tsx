import React from 'react';

export const BentoGrid = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 md:row-span-2 bg-gray-200 p-4 rounded-lg">
            {/* Main content */}
          </div>
          <div className="bg-gray-200 p-4 rounded-lg">{/* Skill 1 */}</div>
          <div className="bg-gray-200 p-4 rounded-lg">{/* Skill 2 */}</div>
          <div className="bg-gray-200 p-4 rounded-lg">{/* Skill 3 */}</div>
          <div className="bg-gray-200 p-4 rounded-lg">{/* Skill 4 */}</div>
        </div>
      </div>
    </section>
  );
};
