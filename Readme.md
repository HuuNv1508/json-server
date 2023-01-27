B1: cài đặt json-server:
    npm install -g json-server
B2: tạo file db.json: paste file vào trong đó
B3: gõ json-server --watch db.json
B4:Nếu xảy ra lỗi thì gõ vào terminal:
 set-ExecutionPolicy RemoteSigned -Scope CurrentUser
 Get-ExecutionPolicy RemoteSigned
 Get-ExecutionPolicy -list 
B5:setup custom json-server:
khởi tạo git : npm init (khởi tạo package.json)
-> git init -> tạo file: .gitignore -> vào trang gitignore generator(gitignore.io) ->chọn node
 -> create ->copy ->paste vào file
cài json-server vào project hiện tại: npm i json-server
cài nodemon: npm i --save-dev nodemon
tạo file main.js -> lên json-server(google) ->custom rouster example ->copy và paste
thêm vào trong script của file package.json :
"dev":"nodemon main.js"
"start":"node main.js"
chạy thử : npm run dev
tạo file test.http -> và test trực tiếp trong đó
muốn khi gọi api có /api thì sửa trong file mai.js:
// Use default router
server.use('/api',router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
thêm vào trong phương thức post: trong main.js
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
    req.body.updatedAt = Date.now()
  }
Random data với faker:
npm i --save-dev faker
tạo flie generate-data.js:
const faker = require('faker')
const fs = require('fs');
//set locale to use vietnamese
faker.locale = 'vi';

thêm vào file script :
-> "start": " npm run generate-data && node main.js",
    "generate-data":"node generate-data.js"

random dữ liệu cho danh mục:
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
                price: faker.commerce.price(),
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
//random data
(() =>{
    const categoryList = randomCategoryList(10);
    const productList = randomProductList(categoryList, 10);
    //tạo initial db
    const db = {
        categories: categoryList,
        products:  productList,
        profile: {
            name:'pro',
        }
    };
    //viết dữ liệu vào file initial db 
    fs.writeFile('db.json', JSON.stringify(db), ()=>{
        console.log('Generate-data successfuly :))');
    })
})()
chạy thử npm run generate-data
setup pagination:
