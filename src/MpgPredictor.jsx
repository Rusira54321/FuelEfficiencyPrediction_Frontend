import React, { useState } from "react";
import { toast, Bounce } from "react-toastify";

function MpgPredictor() {
  const [formData, setFormData] = useState({
    horsepower: 0,
    displacement: 0,
    weight_kg: 0,
    acceleration: 0,
    model_year: 0,
    Europe: 0,
    Japan: 0,
    USA: 0,
    brand_ford: 0,
    brand_chevrolet: 0,
    brand_toyota: 0,
    brand_audi: 0,
    brand_buick: 0,
    brand_chrysler: 0,
    brand_datsun: 0,
    brand_dodge: 0,
    brand_fiat: 0,
    brand_honda: 0,
    brand_mazda: 0,
    brand_mercury: 0,
    brand_oldsmobile: 0,
    brand_opel: 0,
    brand_other: 0,
    brand_peugeot: 0,
    brand_plymouth: 0,
    brand_pontiac: 0,
    brand_renault: 0,
    brand_saab: 0,
    brand_subaru: 0,
    brand_volkswagen: 0,
    brand_volvo: 0,
    cyl_3: 0,
    cyl_4: 0,
    cyl_5: 0,
    cyl_6: 0,
    cyl_8: 0
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }));
  };

  const handleSelectChange = (e, options, prefix) => {
    const selected = e.target.value;
    const updated = { ...formData };
    options.forEach(option => {
      updated[`${prefix}_${option}`] = option === selected ? 1 : 0;
    });
    setFormData(updated);
  };

  const handleOriginSelectChange = (e, options) => {
    const selected = e.target.value;
    const updated = { ...formData };
    options.forEach(option => {
      updated[`${option}`] = option === selected ? 1 : 0;
    });
    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.model_year < 1900 || formData.model_year > 2100) {
      toast.error('Year is not valid', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      return;
    }
    try {
      const response = await fetch("https://mpgenius-app.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setPrediction(data.mpg_prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Prediction failed. Please check backend or network.");
    }
  };

  const originOptions = ["Europe", "Japan", "USA"];
  const brandOptions = [
    "ford", "chevrolet", "toyota", "audi", "buick", "chrysler", "datsun", "dodge", "fiat",
    "honda", "mazda", "mercury", "oldsmobile", "opel", "other", "peugeot", "plymouth",
    "pontiac", "renault", "saab", "subaru", "volkswagen", "volvo"
  ];
  const cylinderOptions = ["3", "4", "5", "6", "8"];

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-800 py-8 px-2">
    <div className="w-full max-w-xl bg-gradient-to-br from-gray-800 via-indigo-900 to-gray-900 rounded-2xl shadow-2xl p-8 border border-indigo-700/30">
      <h2 className="text-4xl font-extrabold text-indigo-300 mb-8 text-center tracking-tight drop-shadow-lg bg-gradient-to-r from-indigo-700 via-indigo-500 to-indigo-700 bg-clip-text text-transparent p-2 rounded-lg">
        Accurate Fuel Efficiency Estimator
      </h2>
      <p className="text-lg text-indigo-100 mb-6 text-center font-medium bg-indigo-900/30 p-4 rounded-xl shadow">
        Predict your car's fuel efficiency using machine learning. Just enter your vehicle details and get an instant MPG estimate!
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <label className="flex flex-col font-semibold text-indigo-200">
            Engine Horsepower (hp):
            <input
              type="number"
              name="horsepower"
              onChange={handleChange}
              value={formData.horsepower}
              required
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              min={0}
            />
          </label>

          <label className="flex flex-col font-semibold text-indigo-200">
            Engine Displacement (cubic inches):
            <input
              type="number"
              name="displacement"
              onChange={handleChange}
              value={formData.displacement}
              required
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              min={0}
            />
          </label>

          <label className="flex flex-col font-semibold text-indigo-200">
            Weight (kg):
            <input
              type="number"
              name="weight_kg"
              onChange={handleChange}
              value={formData.weight_kg}
              required
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              min={0}
            />
          </label>

          <label className="flex flex-col font-semibold text-indigo-200">
            Acceleration (0 to 60 mph in seconds):
            <input
              type="number"
              name="acceleration"
              onChange={handleChange}
              value={formData.acceleration}
              required
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              min={0}
            />
          </label>

          <label className="flex flex-col font-semibold text-indigo-200">
            Model Year:
            <input
              type="number"
              name="model_year"
              onChange={handleChange}
              value={formData.model_year}
              required
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              min={1900}
              max={2100}
            />
          </label>

          <label className="flex flex-col font-semibold text-indigo-200">
            Car Origin:
            <select
              onChange={(e) => handleOriginSelectChange(e, originOptions)}
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              defaultValue=""
            >
              <option value="">Select Origin</option>
              {originOptions.map(origin => (
                <option key={origin} value={origin}>{origin}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col font-semibold text-indigo-200">
            Car Brand:
            <select
              onChange={(e) => handleSelectChange(e, brandOptions, "brand")}
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              defaultValue=""
            >
              <option value="">Select Brand</option>
              {brandOptions.map(brand => (
                <option key={brand} value={brand}>{brand.charAt(0).toUpperCase() + brand.slice(1)}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col font-semibold text-indigo-200">
            Engine Cylinders:
            <select
              onChange={(e) => handleSelectChange(e, cylinderOptions, "cyl")}
              className="mt-2 px-4 py-2 rounded-lg border border-indigo-700 bg-gray-900 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              defaultValue=""
            >
              <option value="">Select Cylinders</option>
              {cylinderOptions.map(cyl => (
                <option key={cyl} value={cyl}>{cyl}</option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-2 bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:scale-105 hover:bg-indigo-800 transition duration-200"
        >
          Predict MPG
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-10 bg-gradient-to-br from-indigo-900 via-indigo-700 to-gray-900 rounded-xl p-8 text-center shadow-lg border border-indigo-700/40">
          <h3 className="text-2xl font-bold text-indigo-200 mb-4">Predicted Fuel Efficiency:</h3>
          <p className="text-xl text-indigo-100 mb-2">
            <strong>MPG (Miles per Gallon):</strong> <span className="text-indigo-300">{prediction}</span>
          </p>
          <p className="text-xl text-indigo-100">
            <strong>L/100km (Liters per 100 km):</strong> <span className="text-indigo-300">{(235.214583 / prediction).toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  </div>
);
}

export default MpgPredictor;