import re
import datetime

import requests
from flask import Flask, render_template, request,jsonify
from flaskext.mysql import MySQL
import traceback
from flask_cors import CORS, cross_origin

app=Flask(__name__)
CORS(app)
mysql = MySQL(autocommit=True)
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'Smallworld@9286'
app.config['MYSQL_DATABASE_DB'] = 'Inventory'
app.config['MYSQL_DATABASE_HOST'] = 'localhost'
app.config['MYSQL_PORT'] = '3306'
mysql.init_app(app)

x = datetime.datetime.now()
count=0
@app.route('/',methods=["GET","POST"])
def get_time():
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek",
        "Age":"22",
        "Date":x,
        "programming":"python"
        }
 
@app.route('/login',methods=["GET"])
def login():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM usercredentials")
        rows = cursor.fetchall()
        # Convert the fetched data into a list of dictionaries
        user_list = []
        for row in rows:
            user_dict = {
                'id': row[0],
                'username': row[1],
                'password': row[2],
                'email': row[3],
                # Add other attributes from the database as needed
            }
            user_list.append(user_dict)

        # jsonify the list of dictionaries
        resp = jsonify(user_list)
        cursor.close()
        return resp
    except Exception as e:
        print("Something went wrong when processing the data:", str(e))
        traceback.print_exc()
        # In case of an error, return a response tuple with status 500
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    

@app.route('/adduser',methods=["POST"])
def adduser():
    try:
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            print(data)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')
            cursor.execute("insert into usercredentials(username, email, password) values (%s, %s, %s)", (username, email, password))
            conn.commit()
            resp = jsonify({"message": "User Added successfully"})
            return resp
    except Exception as e:
        print("Error when processing the data:", str(e))
        traceback.print_exc()
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    finally:
        cursor.close()
    

@app.route('/items',methods=["GET","DELETE","PUT"])
def items():
    try:
        if request.method == 'GET':    
            conn = mysql.connect()
            cursor =conn.cursor()
            cursor.execute("SELECT * FROM items")
            rows = cursor.fetchall()

            # Convert the fetched data into a list of dictionaries
            item_list = []
            for row in rows:
                item_dict = {
                    'id': row[0],
                    'item': row[1],
                    'description': row[2],
                    'imglocation': row[3],
                    'category': row[4],
                    'quantity': row[5],
                    'price': row[6],
                    'createdDate': row[7],
                    'updatedDate': row[8],
                    'addedBy': row[9],
                    # Add other attributes from the database as needed
                }
                item_list.append(item_dict)

            # jsonify the list of dictionaries
            resp = jsonify(item_list)

        elif request.method == 'DELETE':
                data = request.json
                conn = mysql.connect()
                cursor =conn.cursor()
                item = data.get('item')
                cursor = conn.cursor()
                cursor.execute("DELETE from items where item=%s ", (item))
                conn.commit()
                cursor.close()

                response = jsonify({"message": "Item Deleted from cart successfully"})
                return response, 200  
        elif request.method == 'PUT':
                data = request.json
                print(data)
                conn = mysql.connect()
                cursor =conn.cursor()
                # item = data.get('item')
                # description = data.get('description')
                # price = data.get('price')
                # quantity = data.get('quantity')
                item = request.json.get('item')
                description = request.json.get('description')
                price = request.json.get('price')
                quantity = request.json.get('quantity')
                print("Data received:", data)
                print("Item:", item)
                print("Description:", description)
                print("Price:", price)
                print("Quantity:", quantity)

                cursor = conn.cursor()
                cursor.execute("update items set description=%s,price=%s,quantity=%s where item=%s ;", (description,price,quantity,item))
                conn.commit()
                cursor.close()

                response = jsonify({"message": "Item updated successfully"})
                return response, 200        
            
    except:
        print("Something went wrong when writing to the file")
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    finally:
        cursor.close()

    return resp

@app.route('/additems',methods=["POST"])
def additems():
    try:
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            print(data)
            item = data.get('item')
            description = data.get('description')
            price = data.get('price')
            quantity = data.get('quantity')
            category = data.get('category')
            imagelocation = data.get('imagelocation')
            createdDate = data.get('createdDate')
            updatedDate = data.get('updatedDate')
            addedBy = data.get('addedBy')
            cursor.execute("insert into items(item, description, price, quantity, category, imglocation, createdDate, updatedDate, addedBy) values (%s, %s, %s, %s, %s, %s, %s, %s, %s)", (item, description, price, quantity, category, imagelocation, createdDate, updatedDate, addedBy))
            conn.commit()
            resp = jsonify({"message": "Item Added to cart successfully"})
            return resp
    except Exception as e:
        print("Error when processing the data:", str(e))
        traceback.print_exc()
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    finally:
        cursor.close()

@app.route('/addLocation', methods=["POST"])
def addLocation():
    try:
        data = request.json
        conn = mysql.connect()
        cursor = conn.cursor()
        
        # Extract data fields
        location_name = data.get('locationName')
        address = data.get('address')
        city = data.get('city')
        zipcode = data.get('zipcode')
        created_date = data.get('createdDate')
        added_by = data.get('addedBy')
        
        # Insert data into the locations table
        cursor.execute(
            "INSERT INTO locations (locationName, address, city, zipcode, createdDate, addedBy) "
            "VALUES (%s, %s, %s, %s, %s, %s)",
            (location_name, address, city, zipcode, created_date, added_by)
        )
        
        conn.commit()
        resp = jsonify({"message": "Location added successfully"})
        return resp
    
    except Exception as e:
        print("Error when processing the data:", str(e))
        traceback.print_exc()
        response = jsonify({"error": "Something went wrong"})
        return response, 500
    
    finally:
        cursor.close()
        conn.close()



@app.route('/orders', methods=['POST'])
def create_order():
    try:
        data = request.json

        # Extract billing details
        billing = data['billing']
        billing_name = billing['name']
        billing_address = billing['address']
        billing_city = billing['city']
        billing_state = billing['state']
        billing_zip = billing['zip']
        billing_country = billing['country']
        card_number = billing['cardNumber']
        expiration_date = billing['expirationDate']
        cvv = billing['cvv']

        # Extract other details
        username = data['username']
        total_amount = data['total_amount']

        status = 'Pending'  # Default to 'Pending' if not provided
        billing_status = 'Pending'  # Default to 'Pending' if not provided
        
        # Insert order into the orders table
        conn = mysql.connect()
        cursor = conn.cursor()
        cursor.execute('''INSERT INTO orders (total_amount, billing_name, billing_address, 
                billing_city, billing_state, billing_zip, billing_country, 
                card_number, expiration_date, cvv, status, billing_status)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)''',
                (total_amount, billing_name, billing_address, 
                 billing_city, billing_state, billing_zip, billing_country, 
                 card_number, expiration_date, cvv, 'Pending', 'Pending'))
    
        conn.commit()

        # Handle items if necessary (insert into a separate table)
        for item in data['items']:
            for product in item['data']:
                # Assuming you have an order_items table to store items with the order_id
                # You might want to get the last inserted order ID here
                order_id = cursor.lastrowid  # Get the last inserted order ID

                cursor.execute('''INSERT INTO order_items (order_id, product_id, item_name, price, quantity)
                                VALUES (%s, %s, %s, %s, %s)''',
                                (order_id, product['id'], product['item'], product['price'], product['quantity']))
        
        # Commit the items transaction
        mysql.connection.commit()
        
        return jsonify({"message": "Order created successfully!"}), 201
        
    except Exception as e:
        print("Error creating order:", str(e))
        traceback.print_exc()
        return jsonify({"error": "An error occurred while creating the order."}), 500

@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order_details(order_id):
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        
        # Execute the query to fetch order details
        cursor.execute("SELECT * FROM orders WHERE order_id = %s", (order_id,))
        order = cursor.fetchone()

        if order:
            order_details = {
                "order_id": order[0],
                "user_id": order[1],
                "order_date": order[2].isoformat(),  # Convert datetime to ISO format
                "total_amount": str(order[3]),
                "billing_name": order[4],
                "billing_address": order[5],
                "billing_city": order[6],
                "billing_state": order[7],
                "billing_zip": order[8],
                "billing_country": order[9],
                "card_number": f"**** **** **** {order[10][-4:]}",  # Mask card number except last 4 digits
                "expiration_date": order[11],
                "status": order[12],
                "billing_status": order[13]
            }
            return jsonify(order_details), 200
        else:
            return jsonify({"error": "Order not found"}), 404

    except Exception as e:
        print("Error retrieving order details:", str(e))
        traceback.print_exc()
        return jsonify({"error": "An error occurred while retrieving the order details."}), 500

    finally:
        cursor.close()


@app.route('/getLocation', methods=["GET"])
def getLocation():
    try:
        conn = mysql.connect()
        cursor = conn.cursor()
        
        # SQL query to fetch all locations
        query = "SELECT locationName, address, city, zipcode, createdDate, addedBy FROM locations"
        cursor.execute(query)
        locations = cursor.fetchall()
        
        # Convert result to a list of dictionaries
        location_list = []
        for location in locations:
            location_list.append({
                "locationName": location[0],
                "address": location[1],
                "city": location[2],
                "zipcode": location[3],
                "createdDate": location[4],
                "addedBy": location[5]
            })
        
        return jsonify(location_list)
    
    except Exception as e:
        print("Error retrieving locations:", str(e))
        traceback.print_exc()
        return jsonify({"error": "Something went wrong"}), 500
    
    finally:
        cursor.close()
        conn.close()

        
        

@app.route('/cart',methods=["POST","GET","DELETE"])
def cart():
    try:
        
        if request.method == 'POST':
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            item = data.get('item')
            quantity = data.get('quantity')
            price = data.get('price')
            username=data.get('username')
            cursor = conn.cursor()
        # Check if the item is already in the cart for the given username
            cursor.execute("SELECT id, quantity FROM cart WHERE item = %s AND username = %s", (item, username))
            existing_item = cursor.fetchone()

            if existing_item:
            # If the item exists, update the quantity
                new_quantity = existing_item[1] + int(quantity)
                cursor.execute("UPDATE cart SET quantity = %s WHERE id = %s", (new_quantity, existing_item[0]))
            else:
            # If the item doesn't exist, insert a new row
                cursor.execute("INSERT INTO cart (item, quantity, price, username) VALUES (%s, %s, %s, %s)", (item, quantity, price, username))

            conn.commit()
            response = jsonify({"message": "Item added to cart successfully"})
            return response, 200
        
        elif request.method == 'DELETE':
            data = request.json
            conn = mysql.connect()
            cursor =conn.cursor()
            item = data.get('item')
            username=data.get('username')
            cursor = conn.cursor()
            cursor.execute("DELETE from cart where item=%s and username=%s", (item,username))
            conn.commit()
            cursor.close()

            response = jsonify({"message": "Item Deleted from cart successfully"})
            return response, 200

        else:
            conn = mysql.connect()
            cursor =conn.cursor()
            cursor.execute("SELECT * FROM cart")
        rows = cursor.fetchall()

        # Create a list to hold the response data for all users
        response_data = []
        current_user_data = None
        current_username = None

        # Convert the fetched data into a list of dictionaries
        for row in rows:
            username = row[4]
            cart_dict = {
                'id': row[0],
                'item': row[1],
                'quantity': row[2],
                'price': row[3],
                # Add other attributes from the database as needed
            }

            # If the username changes, create a new user entry in the response data list
            if username != current_username:
                current_username = username
                current_user_data = {
                    'username': username,
                    'data': []
                }
                response_data.append(current_user_data)

            current_user_data['data'].append(cart_dict)

        # jsonify the list of user data
        resp = jsonify(response_data)
        return resp, 200


       
    except Exception as e:
        print("Something went wrong when processing the data:", str(e))
        traceback.print_exc()
        # In case of an error, return a response tuple with status 400
        response = jsonify({"error": "Something went wrong"})
        return response, 400

    
# OpenAI API settings
API_URL = "https://api.openai.com/v1/chat/completions"
API_KEY = "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";



@app.route('/api/getOrderDecision', methods=['POST'])
def get_order_decision():
    print("<<<<<<<<<------In get_order_decision------>>>>>")
    data = request.json
    base64_image ="";# data.get('image')  # Base64 image should be sent under the key 'image'
    ticket_description = data.get('description')
    order_id = data.get('orderId')  # Extracting order details from the request
    order_details = get_order_details(order_id)  # Function to get order details
    if not order_details:
        return jsonify({'error': 'Order not found'}), 404

    # if not base64_image or not ticket_description or not order_details:
    #     return jsonify({'error': 'Missing image, ticket description, or order details'}), 400

    # Prepare the request to OpenAI API
    messages = [
        {
            "role": "user",
            "content": (
                "You are an AI assistant designed to analyze customer service inquiries regarding product issues. "
                "Based on the provided information, determine if the product falls into one of the following categories:\n\n"
                "1. **Refund Order**: The customer is requesting a refund for a product due to dissatisfaction or defect.\n"
                "2. **Replace Order**: The customer is requesting a replacement for a product that is defective or not as described.\n"
                "3. **Escalate to Human Agent**: The issue is complex, or the customer requires special assistance beyond your capabilities.\n\n"
                "**Customer Inquiry:**\n\"{}\"\n\n"
                "**Order Details:**\n\"{}\"\n\n"
                "Based on the above information, classify the request into one of the three categories. "
                "If the information is insufficient to make a decision, advise to consult a human agent for further assistance. "
                "Please provide only the option.".format(ticket_description, order_details)
            )
        },
        {
            "role": "user",
            "content": base64_image  # Directly use the Base64 image sent by the UI
        }
    ]

    json_request = {
        "model": "gpt-4",  # Specify the model
        "messages": messages
    }

    # Send request to OpenAI API
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, headers=headers, json=json_request)

    # if response.status_code == 200:
    #     decision = response.json().get('choices')[0]['message']['content'].strip()
    #     print("decision : ",decision)
    #     # Classify the decision into defined categories
    #     if "refund" in decision.lower():
    #         return jsonify({"decision": "Refund Order"}), 200
    #     elif "replace" in decision.lower():
    #         return jsonify({"decision": "Replace Order"}), 200
    #     else:
    #         return jsonify({"decision": "Escalate to Human Agent"}), 200
    # else:
    #     return jsonify({'error': 'API request failed', 'status_code': response.status_code}), 500

    if response.status_code == 200:
            decision = response.json().get('choices')[0]['message']['content'].strip()
            print("decision : ",decision)

            # Classify the decision into defined categories
            if "refund" in decision.lower():
                update_order_status(order_id, "Refund")  # Function to update order status
                return jsonify({"decision": "Refund Order"}), 200
            elif "replace" in decision.lower():
                update_order_status(order_id, "Replace")  # Function to update order status
                return jsonify({"decision": "Replace Order"}), 200
            else:
                update_order_status(order_id, "Escalate")  # Function to update order status
                return jsonify({"decision": "Escalate to Human Agent"}), 200
    else:
        return jsonify({'error': 'API request failed', 'status_code': response.status_code}), 500

# @app.route('/api/updateOrderStatus', methods=['POST'])
def update_order_status(orderId,status):
    try:
        # Get JSON data from the request
        #data = request.json
        order_id =orderId #data.get('orderId')
        new_status =status# data.get('status')

        if not order_id or not new_status:
            return jsonify({"error": "Missing order ID or status"}), 400

        conn = mysql.connect()
        cursor =conn.cursor()

        # SQL query to update the order status
        query = "UPDATE orders SET status = %s WHERE order_id = %s"
        cursor.execute(query, (new_status, order_id))
        conn.commit()  # Commit the changes

        if cursor.rowcount == 0:
            return jsonify({"error": "Order ID not found"}), 404

        return jsonify({"message": "Order status updated successfully"}), 200

    except Exception as e:
        print("Error updating order status:", str(e))
        traceback.print_exc()
        return jsonify({"error": "Something went wrong"}), 500

    finally:
        cursor.close()


@app.route('/api/getTransactionDecision', methods=['POST'])
def get_transaction_decision():
    print("<<<<<<<<<------In getTransactionDecision------>>>>>")
    data = request.json
    base64_image ="";# data.get('image')  # Base64 image should be sent under the key 'image'
    ticket_description = data.get('description')
    order_id = data.get('orderId')  # Extracting order details from the request
    order_details = get_order_details(order_id)  # Function to get order details
    if not order_details:
        return jsonify({'error': 'Order not found'}), 404

    # if not base64_image or not ticket_description or not order_details:
    #     return jsonify({'error': 'Missing image, ticket description, or order details'}), 400

    # Prepare the request to OpenAI API
    messages = [
        {
            "role": "user",
            "content": (
                "You are an AI assistant designed to analyze customer service inquiries regarding fraudulent transactions on credit cards. "
                "Based on the provided information, determine if the transaction falls into one of the following categories:\n\n"
                "1. **Refund**: The customer is requesting a refund for a fraudulent transaction on their credit card for a purchased product/service.\n"
                "2. **Decline**: The transaction is legitimate and should not be refunded.\n"
                "3. **Escalate to Human Agent**: The issue is complex, or the customer requires special assistance beyond your capabilities.\n\n"
                "**Customer Inquiry:**\n\"{}\"\n\n"
                "**Order Details:**\n\"{}\"\n\n"
                "**Image of Transaction:** (OCR data provided by the customer)\n\"{}\"\n\n"
                "Based on the above information, classify the request into one of the three categories. "
                "If the information is insufficient to make a decision, advise consulting a human agent for further assistance. "
                "Please provide only the option.".format(ticket_description, order_details, base64_image)
            )
        },
        {
            "role": "user",
            "content": base64_image  # Directly use the Base64 image sent by the UI
        }
    ]

    json_request = {
        "model": "gpt-4",  # Specify the model
        "messages": messages
    }

    # Send request to OpenAI API
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(API_URL, headers=headers, json=json_request)

    
    if response.status_code == 200:
            decision = response.json().get('choices')[0]['message']['content'].strip()
            # Classify the decision into defined categories
            print("decision : ",decision)

            if "refund" in decision.lower():
                update_billing_status(order_id, "Refund")  # Function to update order status
                return jsonify({"decision": "Refund Order"}), 200
            elif "decline" in decision.lower():
                update_billing_status(order_id, "Declined")  # Function to update order status
                return jsonify({"decision": "Decline Payment"}), 200
            else:
                update_billing_status(order_id, "Escalate to Human Agent")  # Function to update order status
                return jsonify({"decision": "Escalate to Human Agent"}), 200
    else:
        return jsonify({'error': 'API request failed', 'status_code': response.status_code}), 500

# @app.route('/api/updateOrderStatus', methods=['POST'])
def update_billing_status(orderId,status):
    try:
        # Get JSON data from the request
        #data = request.json
        order_id =orderId #data.get('orderId')
        new_status =status# data.get('status')

        if not order_id or not new_status:
            return jsonify({"error": "Missing order ID or status"}), 400

        valid_statuses = ['Pending', 'Paid', 'Declined', 'Refund', 'Escalate to Human Agent']
        if new_status not in valid_statuses:
            return jsonify({"error": f"Invalid status: {new_status}. Valid options are {valid_statuses}."}), 400

        conn = mysql.connect()
        cursor =conn.cursor()

        # SQL query to update the order status
        query = "UPDATE orders SET billing_status = %s WHERE order_id = %s"
        cursor.execute(query, (new_status, order_id))
        conn.commit()  # Commit the changes

        if cursor.rowcount == 0:
            return jsonify({"error": "Order ID not found"}), 404

        return jsonify({"message": "billing status updated successfully"}), 200

    except Exception as e:
        print("Error updating billing status:", str(e))
        traceback.print_exc()
        return jsonify({"error": "Something went wrong"}), 500

    finally:
        cursor.close()
if __name__ == '__main__':
    app.run(host="0.0.0.0", port="5000", debug=True)