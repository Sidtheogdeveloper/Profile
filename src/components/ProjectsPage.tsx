import React, { useState, useEffect } from 'react';
import { ArrowLeft, ExternalLink, Code, Calendar, Star, Github, Globe, ChevronRight } from 'lucide-react';

const ProjectsPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      id: 'stocktrader-pro',
      title: "StockTrader Pro",
      subtitle: "AI-Powered Investment Platform",
      description: "A sophisticated machine learning-powered web application that analyzes historical stock data and market trends to provide intelligent investment insights and trading recommendations.",
      longDescription: "StockTrader Pro leverages advanced machine learning algorithms and big data analytics to democratize investment intelligence. The platform processes vast amounts of historical market data, identifies patterns, and generates actionable investment insights. With real-time market analysis, risk assessment, and portfolio optimization features, it serves both novice and experienced investors seeking data-driven investment strategies.",
      features: [
        "A machine learning-powered web application that analyzes historical stock data, and market trends to provide smart investment insights"
      ],
      detailedFeatures: [
        {
          title: "ML-Powered Analysis",
          description: "Advanced algorithms analyzing market patterns and predicting trends",
          icon: "🤖"
        },
        {
          title: "Real-time Data",
          description: "Live data integration with instant analysis and alerts",
          icon: "⚡"
        },
        {
          title: "Portfolio Tracking",
          description: "Easy tracking of investments with performance metrics and risk assessment",
          icon: "📊"
        },
      ],
      tech: ["Machine Learning", "React", "Financial APIs", "Cloud Deployment"],
      github: "https://github.com/username/stocktrader-pro",
      website: "https://stocktraderspro.netlify.app",
      color: "orange",
      icon: "📈",
      status: "Live",
      timeline: "2 months"
    },
    {
      id: 'cab-hailing',
      title: "Cab Hailing App",
      subtitle: "EzCabz - Smart Transportation Solution",
      description: "A comprehensive Python-based ride booking application that revolutionizes urban transportation with intelligent algorithms and seamless user experience.",
      longDescription: "EzCabz represents a complete transportation ecosystem built from the ground up using Python. The application features sophisticated driver assignment algorithms that consider multiple factors including driver ratings, proximity, and availability to ensure optimal ride experiences. The platform includes comprehensive user management, real-time tracking, and a robust API infrastructure that handles thousands of concurrent requests.",
      features: [
        "Developed a Python-based application to book cab rides",
        "Developed an algorithm that assigns the driver with the time and rating of the driver",
        "Developed an API server that stores the data of users, drivers, and rides"
      ],
      detailedFeatures: [
        {
          title: "Smart Driver Assignment",
          description: "Advanced algorithm considering driver ratings, location proximity, and availability",
          icon: "🎯"
        },
        {
          title: "Real-time Tracking",
          description: "Live tracking for both riders and drivers with ETA calculations",
          icon: "📍"
        },
        {
          title: "Comprehensive API",
          description: "RESTful API handling user management, and ride booking.",
          icon: "🔗"
        },
        {
          title: "Rating System",
          description: "Bidirectional rating system for quality assurance and service improvement",
          icon: "⭐"
        }
      ],
      tech: ["Python", "Flask/Django", "PostgreSQL", "Redis", "Google Maps API", "WebSocket"],
      github: "https://github.com/Sidtheogdeveloper/EzCabz",
      color: "purple",
      icon: "🚗",
      status: "Completed",
      timeline: "3 months"
    },
    {
      id: 'budget-tracker',
      title: "Budget Tracking App",
      subtitle: "Personal Finance Management System",
      description: "An intelligent financial management application that empowers users to take control of their personal finances through comprehensive budget tracking and insightful analytics.",
      longDescription: "This budget tracking application goes beyond simple expense logging to provide users with deep insights into their spending patterns. Built with Python and featuring a robust database architecture, the app offers real-time financial tracking, categorized expense management, and predictive budgeting capabilities. Users can set financial goals, receive spending alerts, and generate detailed financial reports.",
      features: [
        "Developed a Python-based application that helps users track their budget",
        "Integrated a database to store and retrieve data efficiently"
      ],
      detailedFeatures: [
        {
          title: "Expense Categorization",
          description: "Automatic categorization of expenses with custom category creation",
          icon: "📊"
        },
        {
          title: "Budget Planning",
          description: "Set monthly/yearly budgets with real-time tracking and alerts",
          icon: "🎯"
        },
        {
          title: "Goal Setting",
          description: "Set and track financial goals with progress monitoring",
          icon: "🏆"
        }
      ],
      tech: ["Python", "MySQL","Tkinter", "Data Analytics"],
      github: "https://github.com/Sidtheogdeveloper/Budget-Tracker-App",
      color: "green",
      icon: "💰",
      status: "Completed",
      timeline: "1 months"
    },
    {
      id: 'vehicle-maintenance',
      title: "Vehicle Maintenance & Driver Assistance System",
      subtitle: "Intelligent Automotive Platform",
      description: "A cutting-edge vehicle monitoring and maintenance platform that combines IoT sensors, machine learning, and driver assistance technologies to ensure optimal vehicle performance and safety.",
      longDescription: "This comprehensive automotive platform represents the future of vehicle management, integrating advanced IoT sensors with machine learning algorithms to provide predictive maintenance, real-time health monitoring, and intelligent driver assistance. The system continuously monitors vehicle parameters, predicts potential issues before they occur, and provides actionable insights to both drivers and fleet managers.",
      features: [
        "Developed an intelligent vehicle monitoring and maintenance platform featuring driver assistance modules and alerting systems"
      ],
      detailedFeatures: [
        {
          title: "Maintenance",
          description: "AI-powered analysis to predict maintenance needs before breakdowns occur",
          icon: "🔮"
        },
        {
          title: "Driver Assistance",
          description: "Advanced safety features including collision warnings and traffic sign alerts",
          icon: "🛡️"
        },
        {
          title: "Fleet Management",
          description: "Comprehensive dashboard for managing multiple vehicles and maintenance schedules",
          icon: "🚛"
        }
      ],
      tech: [ "Machine Learning", "Python", "Database Integration", "Web Development", "Data Analytics"],
      github: "https://github.com/tri-tt-hik/Vehicle_maintenance_driver_assistance",
      color: "blue",
      icon: "🔧",
      status: "Completed",
      timeline: "3 months"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              <ArrowLeft size={20} />
              <span>Back to Portfolio</span>
            </a>
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Projects Showcase
            </div>
          </div>
        </div>
      </header>


      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
            Featured Projects
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Explore my journey through innovative software development, from intelligent transportation solutions 
            to AI-powered financial platforms. Each project represents a unique challenge solved with creativity and cutting-edge technology.
          </p>
        </div>
      </section>

      {/* Projects Sections */}
      {projects.map((project, index) => (
        <section key={project.id} id={project.id} className={`py-20 ${index % 2 === 0 ? 'bg-black/20' : ''}`}>
          <div className="max-w-6xl mx-auto px-6">
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible[project.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}>
              {/* Project Header */}
              <div className="text-center mb-16">
                <div className="flex items-center justify-center gap-4 mb-6">
                  <div className={`w-20 h-20 bg-${project.color}-500/20 rounded-2xl flex items-center justify-center text-4xl`}>
                    {project.icon}
                  </div>
                  <div className="text-left">
                    <h2 className={`text-4xl font-bold bg-gradient-to-r from-${project.color}-400 to-${project.color}-600 bg-clip-text text-transparent`}>
                      {project.title}
                    </h2>
                    <p className="text-gray-400 text-lg">{project.subtitle}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span className="text-gray-300">{project.timeline}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star size={16} className={`text-${project.color}-400`} />
                    <span className={`text-${project.color}-400 font-medium`}>{project.status}</span>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Project Description */}
                <div className="space-y-8">
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
                    <p className="text-gray-300 leading-relaxed mb-6">{project.description}</p>
                    <p className="text-gray-400 leading-relaxed">{project.longDescription}</p>
                  </div>

                  {/* Key Features */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                    <div className="space-y-4">
                      {project.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3">
                          <ChevronRight size={20} className={`text-${project.color}-400 mt-0.5 flex-shrink-0`} />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-2 px-6 py-3 bg-${project.color}-500/20 hover:bg-${project.color}-500/30 rounded-lg transition-all duration-300 text-${project.color}-400 hover:text-white transform hover:scale-105`}
                    >
                      <Github size={20} />
                      <span className="font-medium">View Code</span>
                      <ExternalLink size={16} />
                    </a>
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-2 px-6 py-3 bg-${project.color}-500/20 hover:bg-${project.color}-500/30 rounded-lg transition-all duration-300 text-${project.color}-400 hover:text-white transform hover:scale-105`}
                      >
                        <Globe size={20} />
                        <span className="font-medium">Live Demo</span>
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Detailed Features & Tech Stack */}
                <div className="space-y-8">
                  {/* Detailed Features */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold mb-6">Technical Highlights</h3>
                    <div className="grid gap-4">
                      {project.detailedFeatures.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`p-4 bg-${project.color}-500/10 rounded-xl border border-${project.color}-500/20 hover:border-${project.color}-500/40 transition-all duration-300`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-2xl">{feature.icon}</span>
                            <div>
                              <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                              <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                    <h3 className="text-2xl font-bold mb-6">Technology Stack</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-4 py-2 bg-${project.color}-500/20 text-${project.color}-400 rounded-full text-sm font-medium border border-${project.color}-500/30 hover:bg-${project.color}-500/30 transition-all duration-300`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Footer */}
      <footer className="py-12 bg-black/40 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-400 mb-4">
            Interested in collaborating on similar projects?
          </p>
          <a
            href="mailto:siddharthmadhu2005@gmail.com"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold text-white hover:shadow-lg hover:shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </footer>
    </div>

  );
};

export default ProjectsPage;