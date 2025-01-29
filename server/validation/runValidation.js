exports.runValidation = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      errors: {
        wrap: {
          label: "",
        },
      },
    });

    if (error) {
      const errList = error.details.map((err) => err.message);
      return res.status(404).send({ error: errList });
    }
    next();
  };
};
