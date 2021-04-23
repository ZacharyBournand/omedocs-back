
product ( id, product_name, expiration_date, number_of_boxes, quantity_in_box, mass, volume, unit_price, composition,   
        dosage_form cis_code, #user(id) )

user ( id, user_type, establishment, rpps, finess, adeli, email, password, phone_number, address, city, region, zip_code ) 

order ( id, order_number, status, date, #user(id))

notification ( id, message, date, #order(id), #user(id) )

product HAS order ( #product(id), #order(id) )
