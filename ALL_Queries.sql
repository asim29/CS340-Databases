-- Query 1
SELECT Title, COUNT(Title)
FROM Paintings
WHERE Painting_ID IN
	(SELECT Painting_ID 
	FROM Buys
	WHERE Date > "2000-10-10" and Date < "2020-10-10")
GROUP BY TITLE
ORDER BY COUNT(Title) DESC

-- Query 2
(SELECT Customer_ID, COUNT(Customer_ID)
FROM Customer
WHERE Customer_ID IN
	(SELECT Customer_ID 
	FROM Visits
	WHERE Date > "2000-10-10" and Date < "2020-10-10")
GROUP BY Customer_ID
ORDER BY COUNT(Customer_ID) DESC)


-- Query 7
SELECT COUNT(Painting_Title)
FROM Requests
WHERE Painting_Title in 
	(SELECT Title
	FROM Paintings
	WHERE Painting_ID in 
		(SELECT Painting_ID
		FROM Stocks
		WHERE Auction_ID in 
			(SELECT Auction_ID
			FROM Auction
			WHERE Date = (SELECT MAX(Date) FROM Auction))))

-- Query 9
SELECT Name
FROM Person, Customer
WHERE Customer_ID NOT IN 
	(SELECT Customer_ID
	FROM Buys
	WHERE Customer_ID IN 
		(SELECT Customer_ID
		FROM Visits
		WHERE COUNT(Customer_ID)>2
		GROUP BY Customer_ID))
