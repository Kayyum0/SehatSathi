// src/components/MedicineChecker.jsx
import { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaMapMarkerAlt, 
  FaStar, 
  FaRupeeSign, 
  FaFilter,
  FaDirections,
  FaPhone,
  FaClock,
  FaShoppingCart,
  FaTimes
} from "react-icons/fa";

const MedicineChecker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    distance: 10,
    minRating: 0,
    inStock: true
  });

  // Sample data - Replace with actual API calls
  const samplePharmacies = [
    {
      id: 1,
      name: "Apollo Pharmacy",
      address: "Sector 45, Gurugram",
      distance: 1.2,
      rating: 4.5,
      reviews: 124,
      phone: "+91 9876543210",
      timing: "8:00 AM - 11:00 PM",
      coordinates: { lat: 28.4595, lng: 77.0266 },
      medicines: [
        { name: "Paracetamol 500mg", price: 25.50, inStock: true, generic: "Paracetamol" },
        { name: "Azithromycin 250mg", price: 89.75, inStock: true, generic: "Azithromycin" },
        { name: "Vitamin C 1000mg", price: 299.00, inStock: false, generic: "Ascorbic Acid" }
      ]
    },
    {
      id: 2,
      name: "MedPlus Mart",
      address: "DLF Cyber City, Chandigarh",
      distance: 2.8,
      rating: 4.2,
      reviews: 89,
      phone: "+91 9876543211",
      timing: "24/7",
      coordinates: { lat: 28.4967, lng: 77.0942 },
      medicines: [
        { name: "Paracetamol 500mg", price: 22.00, inStock: true, generic: "Paracetamol" },
        { name: "Ibuprofen 400mg", price: 45.25, inStock: true, generic: "Ibuprofen" }
      ]
    },
    {
      id: 3,
      name: "Wellness Forever",
      address: "MG Road, Chandigarh",
      distance: 3.5,
      rating: 4.7,
      reviews: 156,
      phone: "+91 9876543212",
      timing: "9:00 AM - 10:00 PM",
      coordinates: { lat: 28.4789, lng: 77.0805 },
      medicines: [
        { name: "Paracetamol 500mg", price: 28.00, inStock: true, generic: "Paracetamol" },
        { name: "Azithromycin 250mg", price: 95.00, inStock: true, generic: "Azithromycin" },
        { name: "Vitamin D3 60k IU", price: 150.00, inStock: true, generic: "Cholecalciferol" }
      ]
    },
    {
      id: 4,
      name: "Fortis Pharmacy",
      address: "Sector 40, Chandigarh",
      distance: 0.8,
      rating: 4.8,
      reviews: 203,
      phone: "+91 9876543213",
      timing: "24/7",
      coordinates: { lat: 28.4500, lng: 77.0300 },
      medicines: [
        { name: "Paracetamol 500mg", price: 30.00, inStock: true, generic: "Paracetamol" },
        { name: "Amoxicillin 500mg", price: 120.00, inStock: false, generic: "Amoxicillin" }
      ]
    }
  ];

  useEffect(() => {
    searchMedicines();
  }, [searchTerm, filters]);

  const searchMedicines = () => {
    if (!searchTerm.trim()) {
      setFilteredPharmacies([]);
      return;
    }

    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = samplePharmacies
        .map(pharmacy => ({
          ...pharmacy,
          medicines: pharmacy.medicines.filter(med => 
            med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            med.generic.toLowerCase().includes(searchTerm.toLowerCase())
          )
        }))
        .filter(pharmacy => 
          pharmacy.medicines.length > 0 &&
          pharmacy.distance <= filters.distance &&
          pharmacy.rating >= filters.minRating &&
          (filters.inStock ? pharmacy.medicines.some(med => med.inStock) : true)
        )
        .sort((a, b) => a.distance - b.distance);

      setFilteredPharmacies(results);
      setLoading(false);
    }, 500);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
            size={14}
          />
        ))}
        <span className="text-sm font-semibold ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Medicine Availability Checker</h1>
          <p className="text-gray-600">Find your medicines in nearby pharmacies with real-time pricing</p>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search for medicine (e.g., Paracetamol, Azithromycin...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
            <button 
              onClick={searchMedicines}
              className="bg-teal-600 text-white px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors font-semibold flex items-center justify-center"
            >
              <FaSearch className="mr-2" /> Search
            </button>
          </div>

          {/* Filters */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <FaFilter className="text-teal-600" />
              <span className="font-semibold">Filters:</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Distance (km)</label>
              <select 
                value={filters.distance}
                onChange={(e) => handleFilterChange('distance', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value={5}>Within 5 km</option>
                <option value={10}>Within 10 km</option>
                <option value={15}>Within 15 km</option>
                <option value={20}>Within 20 km</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Min Rating</label>
              <select 
                value={filters.minRating}
                onChange={(e) => handleFilterChange('minRating', parseFloat(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500"
              >
                <option value={0}>Any Rating</option>
                <option value={4}>4★ & above</option>
                <option value={4.5}>4.5★ & above</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="inStock"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="rounded text-teal-600 focus:ring-teal-500"
              />
              <label htmlFor="inStock" className="text-sm font-medium text-gray-700">
                Show in-stock only
              </label>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pharmacies List */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Searching for medicines...</p>
              </div>
            ) : filteredPharmacies.length > 0 ? (
              filteredPharmacies.map(pharmacy => (
                <PharmacyCard 
                  key={pharmacy.id} 
                  pharmacy={pharmacy} 
                  searchTerm={searchTerm}
                />
              ))
            ) : searchTerm ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <FaSearch className="text-4xl text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No medicines found</h3>
                <p className="text-gray-600">Try searching with different keywords or check the spelling</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <FaSearch className="text-4xl text-teal-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Search for medicines</h3>
                <p className="text-gray-600">Enter a medicine name to check availability in nearby pharmacies</p>
              </div>
            )}
          </div>

          {/* Map Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                Nearby Pharmacies Map
              </h3>
              <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <FaMapMarkerAlt className="text-3xl mx-auto mb-2" />
                  <p>Interactive Map</p>
                  <p className="text-sm">(Would show pharmacy locations)</p>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {filteredPharmacies.slice(0, 3).map(pharmacy => (
                  <div key={pharmacy.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                    <span className="font-medium">{pharmacy.name}</span>
                    <span className="text-sm text-gray-600">{pharmacy.distance} km</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Pharmacy Card Component
const PharmacyCard = ({ pharmacy, searchTerm }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      {/* Pharmacy Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-800">{pharmacy.name}</h3>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                {pharmacy.distance} km away
              </span>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center">
                <FaMapMarkerAlt className="text-red-500 mr-1" />
                {pharmacy.address}
              </div>
              <div className="flex items-center">
                <FaClock className="text-blue-500 mr-1" />
                {pharmacy.timing}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {renderStars(pharmacy.rating)}
                <span className="text-gray-500">({pharmacy.reviews} reviews)</span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center text-blue-600 hover:text-blue-800">
                  <FaDirections className="mr-1" /> Directions
                </button>
                <button className="flex items-center text-green-600 hover:text-green-800">
                  <FaPhone className="mr-1" /> Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Medicines List */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold text-gray-700">Available Medicines</h4>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-teal-600 hover:text-teal-800 text-sm font-medium"
          >
            {expanded ? 'Show Less' : 'Show All'}
          </button>
        </div>

        <div className="space-y-3">
          {(expanded ? pharmacy.medicines : pharmacy.medicines.slice(0, 2)).map((medicine, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{medicine.name}</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    medicine.inStock 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {medicine.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">Generic: {medicine.generic}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-gray-800 flex items-center">
                  <FaRupeeSign className="text-gray-600" size={14} />
                  {medicine.price}
                </div>
                {medicine.inStock && (
                  <button className="bg-teal-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-teal-700 transition-colors flex items-center mt-1">
                    <FaShoppingCart className="mr-1" size={12} /> Add
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {pharmacy.medicines.length > 2 && !expanded && (
          <div className="text-center mt-3">
            <span className="text-gray-500 text-sm">
              +{pharmacy.medicines.length - 2} more medicines available
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Star rating component (redefined for this file)
const renderStars = (rating) => {
  const Star = ({ filled }) => (
    <FaStar className={filled ? "text-yellow-400" : "text-gray-300"} size={14} />
  );

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} filled={star <= rating} />
      ))}
      <span className="text-sm font-semibold ml-1">{rating}</span>
    </div>
  );
};

export default MedicineChecker;