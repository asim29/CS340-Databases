import datetime
import names
import random 
import mysql.connector

mydb = mysql.connector.connect(
	host = "localhost",
	user = "root",
	password = "poorrichboy",
	database = "Art_Gallery"
)

mycursor = mydb.cursor()

style_dict = {
	1: "Modernism",
	2: "Impressionism",
	3: "Abstract art",
	4: "Expressionism",
	5: "Cubism",
	6: "Surrealism",
	7: "Post-Impressionism",
	8: "Photorealism"
}

birthplace_dict = {
	1: "France",
	2: "Italy",
	3: "Japan",
	4: "India",
	5: "South America",
	6: "Austria",
	7: "USA",
	8: "Spain",
	9: "Britain",
	10: "Israel",
	11: "Turkey",
	12: "Greece",
	13: "Czech Republic",
}

location_dict = {
	1: "loc1",
	2: "loc2",
	3: "loc3",
	4: "loc4",
	5: "loc5",
	6: "loc6",
	7: "loc7",
	8: "loc8",
	9: "loc9",
	10: "loc10",
	11: "loc11",
	12: "loc12",
	13: "loc13",
	14: "loc14",
	15: "loc15",
	16: "loc16",
	17: "loc17",
	18: "loc18",
	19: "loc19",
	20: "loc20",
}

def Auctions(size):
	for i in range(0,size):
		year = random.randint(2010, 2020)
		month = random.randint(1, 12)
		day = random.randint(1, 28)
		date = datetime.datetime(year, month, day)
		strdate = date.strftime('%Y-%m-%d')
		
		theid = random.randint(100000,999999)
		# print(theid)
		# print(strdate)
		sql = "INSERT INTO Auction (Auction_ID, Date) values (%s, %s)"
		val = (theid, strdate)	
		mycursor.execute(sql, val)
	mydb.commit()
	# print(mycursor.rowcount, "inserted")

def Persons(size):
	person_list = []
	for i in range(0, size):
		name = names.get_full_name()
		theid = random.randint(100000,999999)
		person_list.append(theid)

		sql = "INSERT INTO Person (ID, Name) values (%s, %s)"
		val = (theid, name)
		mycursor.execute(sql, val)
		# print(name)
		# print(theid)
	mydb.commit()

	return person_list

def Artists(persons):
	for i in range(0, 100):
		theid = persons[i]
		style = style_dict[random.randint(1,8)]
		bPlace = birthplace_dict[random.randint(1,13)]
		age = random.randint(10,100)

		sql = "INSERT INTO Artist (Artist_ID, Style, Birth_Place, Age) values (%s, %s, %s, %s)"
		val = (theid, style, bPlace, age)
		mycursor.execute(sql, val)
		# print(style)
		# print(bPlace)
		# print(age)
		# print(theid)
		# print()
	mydb.commit()

def Customers(persons):
	for i in range(100, 200):
		theid = persons[i]
		address = location_dict[random.randint(1,20)]
		Total_Hours = random.randint(1,3600)
		sql = "INSERT INTO Customer (Customer_ID, Address, Total_Hours) values (%s, %s, %s)"
		val = (theid, address, Total_Hours)
		mycursor.execute(sql, val)

		# print(theid)		
	mydb.commit()

def Vendors(persons):
	for i in range(200, 300):
		theid = persons[i]
		location = location_dict[random.randint(1,20)]
		sql = "INSERT INTO Vendor (Vendor_ID, Location) values (%s, %s)"
		val = (theid, location)
		# print(theid)
		mycursor.execute(sql, val)
	mydb.commit()


# Auctions(100)
# all_persons = Persons(300)

# Artists(all_persons)
# Customers(all_persons)
# Vendors(all_persons)

# print(mycursor)