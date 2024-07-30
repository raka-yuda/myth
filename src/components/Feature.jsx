const Feature = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="text-4xl mb-4">{icon}</div>
      <h2 className="text-xl font-semibold mb-2 text-black">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

export default Feature;