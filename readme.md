<!-- // API Endpoints -->

Admin Users:
GET: /admin => get all admin users
POST: /admin/register => create and add a new admin if name does not already exist,
payload:
{
    "name":"xxx",
    "pwd":"xxx",
}
xxx=required
name is required to be unique 

POST: /admin/login => checks name and hashed password against database and returns a JSONWebtoken if password 
                      correct


Users:
GET: /user => get all normal users
POST: /user/register => create and add a new user if name does not already exist
payload:
{
    "name":"xxx",
    "pwd":"xxx",

}
xxx=required
yyy=optional    
name is required to be unique     

POST: /user/login => checks name hashed password against database and returns a JSONWebtoken if password    
                     correct


Items:
GET: /user => get all items
POST: /item/add =>add an item, SKU and item name are required.
payload:
{
    "sku":"xxx",
    "itemName":"xxx",
    "itemDescription": "yyy",
    "itemPrice": "yyy",
    "itemSalePrice": "yyy",
    "itemDiscount": "yyy",
    "itemCategory1": "yyy",
    "itemCategory2": "yyy",
    "brand": "yyy",
    "itemPic1": "yyy",
    "itemPic2": "yyy",
    "UOM": "yyy",
    "QTY": "yyy",
    "hidden": "yyy",
    "expiryDate": "yyy"
}
xxx=required
yyy=optional        
sku is required to be unique
