//const faker = require('faker');
import faker from 'faker';
import fs from 'fs';
//const fs = require('fs');

//set locale to use vietnamese
faker.locale = 'vi';

//tạo category:
const randomCategoryList = (n)=>{
    if(n <= 0) return [];

    const categoryList=[];
    Array.from(new Array(n)).forEach(()=>{
        const category = {
            id:faker.datatype.uuid(),
            name:faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };

        categoryList.push(category);
    });
    return categoryList;
}
//tạo product:
const randomProductList = (categoryList, numberProduct)=>{
    if(numberProduct <= 0) return [];
    const productList = [];

    for(const category of categoryList){
        Array.from(new Array(numberProduct)).forEach(()=>{
            const product= {
                categoryId : category.id,
                id:faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseInt(faker.commerce.price()),
                description:faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400,400),
            };
            productList.push(product)
        })
    }
    return productList;
}
//tạo post
const randomPostList = (numberPost)=>{
    if(numberPost <= 0) return [];

    const postList = [];
    Array.from(new Array(numberPost)).forEach(()=>{
        const post = {
            id:faker.datatype.uuid(),
            name:faker.company.companyName(),
            title:faker.lorem.paragraph(),
            createdAt: Date.now(),
        }
        postList.push(post)
    })
    return postList;
}
//tạo comment:
const randomCommentList= (numberComment)=>{
    if(numberComment <= 0) return [];

    const commentList = [];
    Array.from(new Array(numberComment)).forEach(()=>{
        const comment = {
            userId:faker.datatype.uuid(),
            id:faker.datatype.uuid(),
            name:faker.database.engine(),
            email:faker.internet.domainName(),
            comment:faker.lorem.paragraph(),
            createdAt: Date.now(),
        }
        commentList.push(comment)
    })
    return commentList;
}
//random data
(() =>{
    const categoryList = randomCategoryList(10);
    const productList = randomProductList(categoryList, 10);
    const postList = randomPostList(5);
    const commentList = randomCommentList(5);
    //tạo initial db
    const db = {
        categories: categoryList,
        products:  productList,
        posts:postList,
        comments:commentList,
        profile: {
            name:'Huu',
        }
    };
    //viết dữ liệu vào file initial db 
    fs.writeFile('db.json', JSON.stringify(db), ()=>{
        console.log('Generate-data successfuly :))');
    })
})()
