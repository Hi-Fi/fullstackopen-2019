const listHelper = require('../utils/list_helper')

const getBlog = (likes) => (
    {
        _id: `id_${likes}`,
        title: `title with ${likes}`,
        author: `author with ${likes}`,
        url: `url with ${likes}`,
        likes: likes,
        __v: 0
    }
)

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes([])).toBe(0)
    })

    test('when list has only one blog equals the likes of that', () => {
        expect(listHelper.totalLikes([getBlog(2)])).toBe(2)
    })

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes([getBlog(2), getBlog(2), getBlog(2), getBlog(2), getBlog(2)])).toBe(10)
    })
})

describe('favorite blog', () => {
    test('get most liked blog from single blog', () => {
        expect(listHelper.favoriteBlog([getBlog(1)])).toEqual(getBlog(1))
    })

    test('get most liked blog from multiple blogs', () => {
        expect(listHelper.favoriteBlog([getBlog(1), getBlog(1), getBlog(2)])).toEqual(getBlog(2))
    })

    test('handle empty list when checking most liked blog',  () => {
        expect(listHelper.favoriteBlog([])).toEqual(null)
    })
})

describe('most blogs', () => {
    test('get most blogs by author from single blog', () => {
        expect(listHelper.mostBlogs([getBlog(1)])).toEqual({ "author": "author with 1", "blogs": 1})
    })

    test('get most blogs by author from multiple blogs', () => {
        expect(listHelper.mostBlogs([getBlog(1), getBlog(1), getBlog(2)])).toEqual({ "author": "author with 1", "blogs": 2})
    })

    test('handle empty list when checking most blogs by author',  () => {
        expect(listHelper.mostBlogs([])).toEqual(null)
    })
})

describe('most likes', () => {
    test('get most likes by author from single blog', () => {
        expect(listHelper.mostLikes([getBlog(1)])).toEqual({ "author": "author with 1", "likes": 1})
    })

    test('get most likes by author from multiple blogs', () => {
        expect(listHelper.mostLikes([getBlog(1), getBlog(1), getBlog(1), getBlog(2)])).toEqual({ "author": "author with 1", "likes": 3})
    })

    test('handle empty list when checking most likes by author',  () => {
        expect(listHelper.mostLikes([])).toEqual(null)
    })
})