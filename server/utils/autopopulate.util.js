const Populate = (field) => (next) => {
  populate(field);
  next();
};

export default Populate;
