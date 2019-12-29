/**
 * GET /
 * New Employee Form.
 */
exports.new = (req, res) => {
  res.render('employee', {
    title: 'New Employee'
  });
};
