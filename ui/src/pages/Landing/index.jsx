import React from "react";

const Landing = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 via-blue-700 to-indigo-900 min-h-screen flex items-center justify-center">
      <div className="max-w-xl p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Welcome to Our Platform
        </h1>
        <p className="text-gray-600 mb-6">
          We are here to provide you with the best resources and support on your
          journey to becoming a tech professional. Whether you are a beginner or
          an experienced developer, we have something for everyone.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500 rounded-lg text-white text-center">
            <h2 className="text-lg font-bold mb-2">What We Offer</h2>
            <p>
              - Comprehensive learning paths <br />
              - High-quality tutorials and courses <br />
              - Interactive coding challenges <br />- Supportive community
            </p>
          </div>
          <div className="p-4 bg-indigo-500 rounded-lg text-white text-center">
            <h2 className="text-lg font-bold mb-2">Challenges We Solve</h2>
            <p>
              - Overwhelming amount of tech resources <br />
              - Lack of guidance for beginners <br />
              - Limited hands-on experience <br />- Feeling isolated in the
              learning process
            </p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-gray-500 text-sm">
            Sign up now and join our community to unlock a world of
            opportunities in tech!
          </p>
          {/* Add Sign up and Login buttons here */}
        </div>
      </div>
    </div>
  );
};

export default Landing;
