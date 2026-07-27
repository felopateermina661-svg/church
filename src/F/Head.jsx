 export const SectionTitle = ({ title, subtitle }) => (
      <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-600 rounded-full text-sm font-bold">
                ✨ {subtitle}
                    </span>

                        <h2 className="text-4xl md:text-5xl font-black text-[#1A2744] mt-4">
                              {title}
                                  </h2>

                                      <div className="flex justify-center items-center gap-2 mt-4">
                                            <div className="w-12 h-1 bg-yellow-500 rounded-full"></div>
                                                  <div className="w-3 h-3 bg-[#1A2744] rounded-full"></div>
                                                        <div className="w-12 h-1 bg-yellow-500 rounded-full"></div>
                                                            </div>
                                                              </div>
);