export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          About Me
        </h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              Hi! I'm Prem Aravindan, a passionate developer who loves creating innovative solutions 
              and beautiful user experiences. With a strong foundation in modern web technologies, 
              I bring ideas to life through clean code and thoughtful design.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              I specialize in building scalable applications using cutting-edge frameworks and tools. 
              My approach combines technical expertise with creative problem-solving to deliver 
              exceptional results.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies, contributing to 
              open-source projects, and staying updated with the latest industry trends.
            </p>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-purple-600">🎯 Mission</h3>
              <p className="text-gray-700">
                Creating impactful digital solutions that make a difference in people's lives.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-purple-600">💡 Vision</h3>
              <p className="text-gray-700">
                To be at the forefront of technological innovation and inspire others through my work.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold mb-2 text-purple-600">🚀 Values</h3>
              <p className="text-gray-700">
                Excellence, creativity, continuous learning, and collaborative growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
