import User from '../model/UserModel.js'
import Category from '../model/Category.js'
//for dummy data
class DatabaseSeeder{
    static run(){
        let userData=[
            {
                'name':'admin',
                'email':'admin@gmail.com',
                'password':'admin123',
                'gender':'male'
            },
            {
                'name':'user',
                'email':'user@gmail.com',
                'password':'user123',
                'gender':'male'
            },
            {
                'name':'admin',
                'email':'admin@gmail.com',
                'password':'admin123',
                'gender':'male',
                'role':'admin'
            }
        ]

        userData.forEach(async (user)=>{
            let total=await User.find({email:user.email}).countDocuments()
            if(total==0){
                let newUser=new User(user);
                await newUser.save()
                console.log('user Created',user)
            }
        })

        let categoryData=[
            {
                'name':'Entertainment'
            },
            {
                'name':'politics'
            },
            {
                'name':'Sports'
            }
        ]

        categoryData.forEach(async (category)=>{
            const length=await Category.find({name:category.name}.countDocuments)
            if(length==0){
                let newCategory=new Category(category)
                await newCategory.save()
                console.log('new category create',category);
                
            }
        })
    }
}
export default DatabaseSeeder