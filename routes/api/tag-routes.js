const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({include:[{model: Product, as: 'description_product'}]});
    res.status(200).json(allTags);
  } catch(err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const specificTag = await Tag.findByPk(req.params.id, { include: [{ model: Product, as:'description_product' }] })
    if (!tag) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.status(200).json(specificTag);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try  {
    const [updated] = await Tag.update(req.body, {where: {id: req.params.id}});
    
    if (updated === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.status(200).json({ success: true });
    }

  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try{
    const deleted = await Tag.destroy({where: {id: req.params.id}});
    if (deleted === 0) {
      res.status(404).json({ error: 'Tag not found' });
    } else {
      res.status(200).json({ success: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;