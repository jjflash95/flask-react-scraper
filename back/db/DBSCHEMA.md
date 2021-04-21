TABLE tracking

tracking_id pk
user_id foreign_key

***************************
TABLE tracking_item

tracking_id foreign_key
item_id foreign_key

***************************
TABLE item

item_id pk
title
price
currency
url
image_url
source
updated_at
