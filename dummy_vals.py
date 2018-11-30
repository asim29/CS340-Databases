import datetime
import names
import random 
import mysql.connector
from random_word import RandomWords

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

titles_dict = {
	1: "title1",
	2: "title2",
	3: "title3",
	4: "title4",
	5: "title5",
	6: "title6",
	7: "title7",
	8: "title8",
	9: "title9",
	10: "title10",
	11: "title11",
	12: "title12",
	13: "title13",
	14: "title14",
	15: "title15",
	16: "title16",
	17: "title17",
	18: "title18",
	19: "title19",
	20: "title20",
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
	auctions = []
	print("Auctions")
	for i in range(0,size):
		year = random.randint(2010, 2020)
		month = random.randint(1, 12)
		day = random.randint(1, 28)
		date = datetime.datetime(year, month, day)
		strdate = date.strftime('%Y-%m-%d')
		theid = random.randint(1000000,9999999)
		auctions.append(theid)
		sql = "INSERT INTO Auction (Auction_ID, Date) values (%s, %s)"
		val = (theid, strdate)	
		mycursor.execute(sql, val)
	mydb.commit()

	return auctions 
	# print(mycursor.rowcount, "inserted")

def Persons(size):
	print("Persons")
	person_list = []
	for i in range(0, size):
		name = names.get_full_name()
		theid = random.randint(1000000,9999999)
		person_list.append(theid)
		sql = "INSERT INTO Person (ID, Name) values (%s, %s)"
		val = (theid, name)
		mycursor.execute(sql, val)

	mydb.commit()

	return person_list

def Artists(persons):
	print("Artists")
	for i in range(0, 100):
		theid = persons[i]
		style = style_dict[random.randint(1,8)]
		bPlace = birthplace_dict[random.randint(1,13)]
		age = random.randint(10,100)
		sql = "INSERT INTO Artist (Artist_ID, Style, Birth_Place, Age) values (%s, %s, %s, %s)"
		val = (theid, style, bPlace, age)
		mycursor.execute(sql, val)

	mydb.commit()

def Customers(persons):
	print("Customers")
	for i in range(100, 200):
		theid = persons[i]
		address = location_dict[random.randint(1,20)]
		Total_Hours = random.randint(10,3600)
		sql = "INSERT INTO Customer (Customer_ID, Address, Total_Hours) values (%s, %s, %s)"
		val = (theid, address, Total_Hours)
		mycursor.execute(sql, val)

	mydb.commit()

def Vendors(persons):
	print("Vendors")
	for i in range(200, 300):
		theid = persons[i]
		location = location_dict[random.randint(1,20)]
		sql = "INSERT INTO Vendor (Vendor_ID, Location) values (%s, %s)"
		val = (theid, location)
		mycursor.execute(sql, val)
	mydb.commit()

def Painting(persons):
	print("Painting")
	paintings = []
	painting_titles = []
	for i in range(0, 100):
		artist_id = persons[i]
		for j in range(0, 3):
			year_num = random.randint(2000,2010)
			theid = random.randint(1000000,9999999)
			# title = r.get_random_word()
			lksjdf = random.randint(1,20)
			title = titles_dict[lksjdf]
			price = random.randint(2000,3000)

			year = str(year_num) + "-01-01"
			category = style_dict[random.randint(1,8)]
			# print(year)
			paintings.append(theid)
			painting_titles.append(title)
			sql = "INSERT INTO Paintings (Painting_ID, Artist_ID, Title, Price, Year, Category) values (%s, %s, %s, %s, %s, %s)"
			val = (theid, artist_id, title, price, year, category)
			mycursor.execute(sql, val)
	mydb.commit()

	return paintings, painting_titles

def Requests(persons, titles):
	print("Requests")
	for i in range(125, 175):
		theid = persons[i]
		title = titles[i]
		Year = random.randint(2018,2018)
		Month = random.randint(10,12)
		Date = random.randint(10,30)
		date = str(Year)+"-"+str(Month)+"-"+str(Date)
		sql = "INSERT INTO Requests (Customer_ID, Painting_Title, Date) values (%s, %s, %s)"
		val = (theid, title, date)
		mycursor.execute(sql, val)
	mydb.commit()

def Visits(persons):
	print("Visits")
	for i in range(100,200):
		cust_id = persons[i]
		Year = 2018
		Month = random.randint(10,12)
		Date = random.randint(10,30)
		date = str(Year)+"-"+str(Month)+"-"+str(Date)
		Hours = random.randint(10,12)
		Hours1 = random.randint(1,12)
		Minutes = random.randint(10,59)
		Seconds = random.randint(10,59)
		time_IN = date + " " + str(Hours)+":"+str(Minutes)+":"+str(Seconds)
		sql = "INSERT INTO Visits (Customer_ID, Date, Time_IN, Hours) values (%s, %s, %s, %s)"
		val = (cust_id, date, time_IN, Hours1)
		mycursor.execute(sql, val)
	mydb.commit()

def Sells(persons, paintings):
	print("Sells")
	for i in range(0, 300):
		j = random.randint(200, 299)
		vend = persons[j]
		paint_id = paintings[i]
		Year = 2018
		Month = random.randint(10,12)
		Date = random.randint(10,30)
		date = str(Year)+"-"+str(Month)+"-"+str(Date)
		sell_price = random.randint(1000,2000)
		sql = "INSERT INTO Sells (Painting_ID, Vendor_ID, Date, Sell_Price) values (%s, %s, %s, %s)"
		val = (paint_id, vend, date, sell_price)
		mycursor.execute(sql, val)
	mydb.commit()

def Buys(person, paintings):
	print("Buys")
	for i in range(100, 200):
		cust_id = person[i]
		j = random.randint(0, 299)
		paint_id = paintings[j]
		wYear = 2018
		Month = random.randint(10,12)
		Date = random.randint(10,30)
		date = str(Year)+"-"+str(Month)+"-"+str(Date)
		sell_price = random.randint(1000,2000)
		sql = "INSERT INTO Buys (Painting_ID, Customer_ID, Date) values (%s, %s, %s)"
		val = (paint_id, cust_id, date)
		mycursor.execute(sql, val)
	mydb.commit()


def Stocks(auctions, paintings):
	print("Stocks")
	for i in range(0, 100):
		sell_price = random.randint(2000,3000)
		auc_id = auctions[i]
		j = random.randint(0, 300)
		paint_id = paintings[j]
		sql = "INSERT INTO Stocks (Auction_ID, Painting_ID, Start_Price) values (%s, %s, %s)"
		val = (auc_id, paint_id, sell_price)
		mycursor.execute(sql, val)
	mydb.commit()



aucts = Auctions(100)
all_persons = Persons(300)
Artists(all_persons)
Customers(all_persons)
Vendors(all_persons)

paint_ids, paint_titles = Painting(all_persons)
Requests(all_persons, paint_titles)
Visits(all_persons)
Sells(all_persons, paint_ids)
Buys(all_persons, paint_ids)
Stocks(aucts, paint_ids)
# def Sold_To(persons, auctions, paintings):
# 	for i in range(125, 175):
# 		final_price = random.randint(2000,3000)
# 		pers_id = persons[i]
# 		auc_id = auctions[i-100]
# 		paint_id = paintings[i]
# 		sql = "INSERT INTO Sold_To (Customer_ID, Auction_ID, Painting_ID, Final_Price) values (%s, %s, %s, %s)"
# 		val = (pers_id, auc_id, paint_id, final_price)
# 		mycursor.execute(sql, val)
# 	mydb.commit()
	


# print(mycursor)

print("Done!")