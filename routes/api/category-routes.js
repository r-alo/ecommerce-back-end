const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
router.get('/', async (req, res) => {
  const categories = await Category.findAll({
    include: Product
  });
  res.json(categories);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const categorySearch = await Category.findByPk(id, {
    include: Product
  });
  res.json(categorySearch);

});

  // create a new category
router.post('/', async (req, res) => {
  const newCategory = await Category.create(req.body)
  res.json(newCategory);

});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const categorySearch = await Category.findByPk(id, {
    include: Product
  });
  const updateCategory = await categorySearch.update(req.body);
  res.json(updateCategory);
  
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const categorySearch = await Category.findByPk(id);
  const deleteCategory = await categorySearch.destroy(req.body);
  res.json(deleteCategory);
});

module.exports = router;
