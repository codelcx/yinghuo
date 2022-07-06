//此处用于定义sql语句

//1、插入商品数据
exports.insert_good = "insert into good (title,imgUrl,oprice,nprice) value(?,?,?,?) "


//2、查询所有商品数据
exports.select_all_good = 'select * from good'

//3.根据id查询商品数据
exports.select_good_by_id = "select * from good where id=? "

//4.根据title查询商品数据
exports.select_good_by_title = "select * from good where title like ? order by ? ? "

//查询用户
exports.select_user_by_username = "select * from user where username=? or tel=? "

//登录
exports.select_user = "select * from user where username=? or tel=? and password=? "


//注册
exports.insert_user = "insert into user (username,password,tel,imgSrc,nickname,token,openId,provider) value(?,?,?,?,?,?,?,?)"

//第三方登录查询
exports.select_user_model_openId = "select * from user where provider=? and openId=? "