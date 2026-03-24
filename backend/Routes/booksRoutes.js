import { Router } from "express";
import { prisma } from '../config.js';
const router = Router();
//get
router.get('/', async (req, res) => {
    const allUsers = await prisma.book.findMany();
    res.json(allUsers);
});
router.get('/:id', async (req, res) => {
    const bookId = parseInt(req.params.id);
    const book = await prisma.book.findUnique({
        where: { id: bookId }
    });
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }
    res.json(book);
});

//delete
router.delete('/', async (req, res) => {
    try {
        const deletedBooks = await prisma.book.deleteMany();
        res.json(deletedBooks);
    } catch (error) {
        console.error('Error occurred while deleting books:', error);
        res.status(500).json({ error: 'An error occurred while deleting books' });
    }
})
//post
router.post('/', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        }
        const createdBook = await prisma.book.create({
            data: newBook,
        });
        res.status(201).json(createdBook);


    } catch (error) {
        console.error('Error occurred while creating book:', error);
        res.status(500).json({ error: 'An error occurred while creating book' });
    }

});
//put
router.put('/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id);
        const updatedBookData = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const updatedBook = await prisma.book.update({
            where: { id: bookId },
            data: updatedBookData,
        });
        res.json(updatedBook);
    } catch (error) {
        console.error('Error occurred while updating book:', error);
        res.status(500).json({ error: 'An error occurred while updating book' });
    }
});

export default router;

