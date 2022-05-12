<!-- // API Endpoints -->

Admin Users:
GET: /admin => get all admin users (requires login first)

POST: /admin/register => create and add a new admin if name does not already exist,
payload:
{
    "email": "xxx",
    "pwd": "xxx",
    "name": "yyy",
    "role": "xxx"
}
xxx=required
yyy=optional
role is either admin or superAdmin
email is required to be unique 

POST: /admin/login => checks name and hashed password against database and returns a JSONWebtoken if password 
                      correct

PUT: /admin/update-password
{
"email":"xxx",
"currentPwd":"xxx",
"newPwd":"xxx"
}

DELETE: /admin/:adminId => deletes admin user based on adminID


Users:
GET: /user => get all normal users
POST: /user/register => create and add a new user if name does not already exist
payload:
{
    "email": "xxx",
    "name": "yyy",
    "nickname": "yyy",
    "pwd": "xxx"

}
xxx=required
yyy=optional    
email is required to be unique     

POST: /user/login => checks name hashed password against database and returns a JSONWebtoken if password    
                     correct


Items:
GET: 
/user => get all items
/item/sku/:sku => find an item by sku
/item/category1/:cat1 => find items by category1
/item/category2/"cat2 => find items by category2
/item/brand/:brand => find items by brand

POST: /item/add =>add an item, SKU and item name are required. (require admin login)
payload:
{
    "sku": "xxx",
    "itemName": "xxx",
    "itemDescription": "yyy",
    "itemPrice": yyy,
    "itemSalePrice": yyy,
    "itemDiscount": yyy,
    "itemCategory1": "yyy",
    "itemCategory2": "yyy",
    "brand": "yyy",
    "itemPic1": "yyy",
    "itemPic2": "yyy",
    "UOM": "yyy",
    "Qty": yyy,
    "hidden": false,
    "expiryDate": "yyyy-mm-dd"
}
xxx=required
yyy=optional        
sku is required to be unique
GET: /item/sku/:sku => get specific item by sku

PUT: /item/update/:sku => update item with sku
payload as per items that needs to be changed