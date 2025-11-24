// 'use client'

// import { useState } from 'react';

// interface ExpandedSections {
//   city: boolean;
//   province: boolean;
//   make: boolean;
//   priceRange: boolean;
//   year: boolean;
//   mileage: boolean;
//   search: boolean;
//   registeredIn: boolean;
//   transmission: boolean;
//   color: boolean;
//   engineType: boolean;
//   engineCapacity: boolean;
//   assembly: boolean;
// }

// export default function Marketplace() {
//   const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
//     city: true,
//     province: true,
//     make: true,
//     priceRange: true,
//     year: true,
//     mileage: true,
//     search: true,
//     registeredIn: true,
//     transmission: true,
//     color: true,
//     engineType: true,
//     engineCapacity: true,
//     assembly: true,
//   });

//   const [currentPage, setCurrentPage] = useState(1);


//   const vehicles = [
//     { id: 1, year: 2021, name: 'Tesla Model S', price: 48000, image: '/provax/tesla-model-s.png' },
//     { id: 2, year: 2016, name: 'BMW 320i', price: 48000, image: '/provax/bmw-320i.png' },
//     { id: 3, year: 2020, name: 'Honda Civic', price: 35000, image: '/provax/honda-civic.png' },
//     { id: 4, year: 2019, name: 'Toyota Camry', price: 42000, image: '/provax/toyota-camry.png' },
//     { id: 5, year: 2022, name: 'Mercedes C-Class', price: 55000, image: '/provax/mercedes-c-class.png' },
//     { id: 6, year: 2018, name: 'Audi A4', price: 45000, image: '/provax/audi-a4.png' },
    
//      { id: 11, year: 2021, name: 'Tesla Model S', price: 48000, image: '/provax/tesla-model-s.png' },
//     { id: 12, year: 2016, name: 'BMW 320i', price: 48000, image: '/provax/bmw-320i.png' },
//     { id: 13, year: 2020, name: 'Honda Civic', price: 35000, image: '/provax/honda-civic.png' },
//     { id: 14, year: 2019, name: 'Toyota Camry', price: 42000, image: '/provax/toyota-camry.png' },
//     { id: 15, year: 2022, name: 'Mercedes C-Class', price: 55000, image: '/provax/mercedes-c-class.png' },
//     { id: 16, year: 2018, name: 'Audi A4', price: 45000, image: '/provax/audi-a4.png' },
//   ];

//   const itemsPerPage = 8;
//   const totalPages = Math.ceil(vehicles.length / itemsPerPage);
//   const paginatedVehicles = vehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);    


//   return (
//     <div className="min-h-screen bg-[#0a0f24] pb-12">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//           {/* Sidebar - This will be filled by the filter sections from the original code */}
//           <div className="lg:col-span-1">
//             {/* Filters sidebar will go here */}
//           </div>

//           {/* Main Content Area */}
//           <div className="lg:col-span-3">
//             {/* Vehicle Cards Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
//               {paginatedVehicles.map((vehicle) => (
//                 <div key={vehicle.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 group">
//                   {/* Image Container */}
//                   <div className="relative h-85 bg-gradient-to-br from-white/5 to-white/0 overflow-hidden">
//                     <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-600/20 to-slate-900/40">
//                       {/* Placeholder for vehicle image */}
//                       <div className="text-white/30 text-center">
//                         <svg className="w-24 h-24 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
//                         </svg>
//                         <p className="text-sm">{vehicle.year} {vehicle.name}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Card Content */}
//                   <div className="p-6">
//                     {/* Title */}
//                     <h3 className="text-white font-semibold text-lg mb-2">
//                       {vehicle.year} {vehicle.name}
//                     </h3>

//                     {/* Price */}
//                     <div className="text-[#00ff7f] text-2xl font-bold mb-4">
//                       ${vehicle.price.toLocaleString()}
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex gap-3 items-center">
//                       <button className="flex-1 bg-[#00ff7f] text-black font-semibold py-3 rounded-full hover:bg-[#00e370] transition-colors">
//                         Buy Now
//                       </button>
//                       <button className="w-12 h-12 rounded-full bg-[#00ff7f] flex items-center justify-center hover:bg-[#00e370] transition-all text-black hover:scale-110">
//                         <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
//                           <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//                         </svg>
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Pagination */}
//             <div className="flex items-center justify-center gap-2 md:gap-4">
//               {/* Previous Button */}
//               <button
//                 onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//                 className="w-12 h-12 rounded-full bg-[#00ff7f]/20 border border-[#00ff7f] flex items-center justify-center hover:bg-[#00ff7f]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#00ff7f]"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>

//               {/* Page Numbers */}
//               <div className="flex gap-2">
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`w-10 h-10 rounded-lg font-medium transition-colors ${
//                       currentPage === page
//                         ? 'bg-[#00ff7f] text-black'
//                         : 'text-white/60 hover:text-white'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
//               </div>

//               {/* Next Button */}
//               <button
//                 onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//                 className="w-12 h-12 rounded-full bg-[#00ff7f]/20 border border-[#00ff7f] flex items-center justify-center hover:bg-[#00ff7f]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#00ff7f]"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }   
'use client'

import { useState } from 'react';

interface ExpandedSections {
  city: boolean;
  province: boolean;
  make: boolean;
  priceRange: boolean;
  year: boolean;
  mileage: boolean;
  search: boolean;
  registeredIn: boolean;
  transmission: boolean;
  color: boolean;
  engineType: boolean;
  engineCapacity: boolean;
  assembly: boolean;
}

export default function Marketplace() {
  const [expandedSections, setExpandedSections] = useState<ExpandedSections>({
    city: true,
    province: true,
    make: true,
    priceRange: true,
    year: true,
    mileage: true,
    search: true,
    registeredIn: true,
    transmission: true,
    color: true,
    engineType: true,
    engineCapacity: true,
    assembly: true,
  });

  const [currentPage, setCurrentPage] = useState(1);

  const vehicles = [
    { id: 1, year: 2021, name: 'Tesla Model S', price: 48000, image: '/provax/tesla-model-s.png', country: 'USA', km: '15,000', fuel: 'Electric', seats: '5', transmission: 'Auto' },
    { id: 2, year: 2016, name: 'BMW 320i', price: 48000, image: '/provax/bmw-320i.png', country: 'Germany', km: '45,000', fuel: 'Petrol', seats: '5', transmission: 'Auto' },
    { id: 3, year: 2020, name: 'Honda Civic', price: 35000, image: '/provax/honda-civic.png', country: 'Japan', km: '25,000', fuel: 'Petrol', seats: '5', transmission: 'Manual' },
    { id: 4, year: 2019, name: 'Toyota Camry', price: 42000, image: '/provax/toyota-camry.png', country: 'Japan', km: '30,000', fuel: 'Hybrid', seats: '5', transmission: 'Auto' },
    { id: 5, year: 2022, name: 'Mercedes C-Class', price: 55000, image: '/provax/mercedes-c-class.png', country: 'Germany', km: '10,000', fuel: 'Petrol', seats: '5', transmission: 'Auto' },
    { id: 6, year: 2018, name: 'Audi A4', price: 45000, image: '/provax/audi-a4.png', country: 'Germany', km: '35,000', fuel: 'Diesel', seats: '5', transmission: 'Auto' },
    { id: 11, year: 2021, name: 'Tesla Model S', price: 48000, image: '/provax/tesla-model-s.png', country: 'USA', km: '12,000', fuel: 'Electric', seats: '5', transmission: 'Auto' },
    { id: 12, year: 2016, name: 'BMW 320i', price: 48000, image: '/provax/bmw-320i.png', country: 'Germany', km: '50,000', fuel: 'Petrol', seats: '5', transmission: 'Auto' },
    { id: 13, year: 2020, name: 'Honda Civic', price: 35000, image: '/provax/honda-civic.png', country: 'Japan', km: '22,000', fuel: 'Petrol', seats: '5', transmission: 'Manual' },
    { id: 14, year: 2019, name: 'Toyota Camry', price: 42000, image: '/provax/toyota-camry.png', country: 'Japan', km: '28,000', fuel: 'Hybrid', seats: '5', transmission: 'Auto' },
    { id: 15, year: 2022, name: 'Mercedes C-Class', price: 55000, image: '/provax/mercedes-c-class.png', country: 'Germany', km: '8,000', fuel: 'Petrol', seats: '5', transmission: 'Auto' },
    { id: 16, year: 2018, name: 'Audi A4', price: 45000, image: '/provax/audi-a4.png', country: 'Germany', km: '40,000', fuel: 'Diesel', seats: '5', transmission: 'Auto' },
  ];

  const itemsPerPage = 8;
  const totalPages = Math.ceil(vehicles.length / itemsPerPage);
  const paginatedVehicles = vehicles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#0a0f24] pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - This will be filled by the filter sections from the original code */}
          <div className="lg:col-span-1">
            {/* Filters sidebar will go here */}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Vehicle Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8 mb-12">
              {paginatedVehicles.map((vehicle) => (
                <div key={vehicle.id} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 group cursor-pointer">
                  {/* Image Container - Takes full width */}
                  <div className="relative h-85 bg-gradient-to-br from-white/5 to-white/0 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-slate-600/20 to-slate-900/40">
                      {/* Placeholder for vehicle image */}
                      <div className="text-white/30 text-center">
                        <svg className="w-24 h-24 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm11 0c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
                        </svg>
                        <p className="text-sm">{vehicle.year} {vehicle.name}</p>
                      </div>
                    </div>
                    
                    {/* Hover Content - Moves up and centers */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <h3 className="text-white font-bold text-2xl mb-2 text-center">
                        {vehicle.year} {vehicle.name}
                      </h3>
                      <div className="text-[#00ff7f] text-3xl font-bold mb-6">
                        ${vehicle.price.toLocaleString()}
                      </div>
                      
                      {/* Chips Container */}
                      <div className="flex flex-wrap gap-3 justify-center max-w-xs">
                        {/* Country Chip */}
                        <div className="bg-green-600 backdrop-blur-sm  px-4 py-2 text-white text-sm font-medium border border-green-800">
                          {vehicle.country}
                        </div>
                        {/* Year Chip */}
                        <div className="bg-green-600 backdrop-blur-sm  px-4 py-2 text-white text-sm font-medium border border-green-800">
                          {vehicle.year}
                        </div>
                        {/* KM Chip */}
                        <div className="bg-green-600 backdrop-blur-sm  px-4 py-2 text-white text-sm font-medium border border-green-800">
                          {vehicle.km} km
                        </div>
                        {/* Fuel Type Chip */}
                        <div className="bg-green-600 backdrop-blur-sm  px-4 py-2 text-white text-sm font-medium border border-green-800">
                          {vehicle.fuel}
                        </div>
                        {/* Transmission Chip */}
                        <div className="bg-white/20 backdrop-blur-sm  px-4 py-2 text-white text-sm font-medium border border-green-800">
                          {vehicle.transmission}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content with Background Color */}
                  <div className="p-6 bg-gradient-to-b from-slate-800/50 to-slate-900/80">
                    {/* Title and Price - Hidden on hover */}
                    <div className="group-hover:opacity-0 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {vehicle.year} {vehicle.name}
                      </h3>
                      <div className="text-[#00ff7f] text-2xl font-bold mb-4">
                        ${vehicle.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 items-center mt-2">
                      <button className="flex-1 bg-[#00ff7f] text-black font-semibold py-3 rounded-full hover:bg-[#00e370] transition-colors transform group-hover:scale-105 duration-300">
                        Buy Now
                      </button>
                      <button className="w-12 h-12 rounded-full bg-[#00ff7f] flex items-center justify-center hover:bg-[#00e370] transition-all text-black hover:scale-110 transform group-hover:scale-110 duration-300">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 md:gap-4">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-full bg-[#00ff7f]/20 border border-[#00ff7f] flex items-center justify-center hover:bg-[#00ff7f]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#00ff7f]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-[#00ff7f] text-black'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-full bg-[#00ff7f]/20 border border-[#00ff7f] flex items-center justify-center hover:bg-[#00ff7f]/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-[#00ff7f]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}