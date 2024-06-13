<div className="container mx-auto px-4">
<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
  {/* Left Column: Registration Form */}
  <div>
    <h1 className="text-3xl text-yellow-500 font-bold mb-4 text-center mt-6">Register</h1>
    {formStatus.message && (
      <div className={`p-4 mb-4 ${formStatus.type === 'success' ? 'bg-green-200' : 'bg-red-200'}`}>
        {formStatus.message}
      </div>
    )}
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <label className="block mb-2">
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        Username
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        Password
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>
      <label className="block mb-2">
        Confirm Password
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">
        Register
      </button>
    </form>
  </div>
  {/* Right Column: Image */}
  <div className="flex items-center justify-center">
    <img
      src="https://via.placeholder.com/400"
      alt="Registration Illustration"
      className="max-w-full h-auto rounded-lg shadow-lg"
    />
  </div>
</div>
</div>