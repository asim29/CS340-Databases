-- Query 1 NEW
(
  SELECT
    Paintings.Title AS Title2,
    COUNT(Paintings.Title) AS NumberOfPaintings
  FROM
    Paintings
  WHERE
    Painting_ID IN (
      SELECT
        Painting_ID
      FROM
        Buys
      WHERE
        Date BETWEEN param1
        AND param2
    )
  GROUP BY
    Paintings.Title
  ORDER BY
    COUNT(Paintings.Title) DESC
)
LIMIT 1


-- Query 2 NEW
SELECT
  Person.Name
FROM
  Person
WHERE
  Person.ID IN (
    SELECT
      T1.Customer_ID
    FROM
      (
        SELECT
          V.Customer_ID,
          COUNT(Date) AS NumVisits
        FROM
          Visits AS V
        WHERE
          V.Date BETWEEN param1
          AND param2
        GROUP BY
          V.Customer_ID
        ORDER BY
          NumVisits
        LIMIT
          1
      ) AS T1
  )

-- Query 3 NEW
SELECT
  A.Age,
  A.Artist_ID
FROM
  Artist AS A
WHERE
  A.Artist_ID IN (
    SELECT
      Artist_ID
    FROM
      Paintings AS P
      INNER JOIN (
        SELECT
          T1.Painting_Title,
          MAX(NumRequests) AS NumRequests
        FROM
          (
            SELECT
              R.Painting_Title,
              COUNT(R.Customer_ID) AS NumRequests
            FROM
              Requests AS R
            WHERE
              R.Date BETWEEN param1
              AND param2
            GROUP BY
              R.Painting_Title
          ) AS T1
      ) AS T2 ON P.Title = T2.Painting_Title
  )

 -- Query 4 NEW 
 SELECT
  *
FROM
  Customer AS C
  INNER JOIN Person AS P ON C.Customer_ID = P.ID
WHERE
  C.Customer_ID IN (
    SELECT
      Customer_ID
    FROM
      Paintings AS P
      INNER JOIN Buys AS B ON P.Painting_ID = B.Painting_ID
    WHERE
      P.Title = param1
  )


-- Query 5 NEW
SELECT
  P.Painting_ID,
  S.Sell_Price,
  P.Price,
  (P.Price - S.Sell_Price) AS Profit
FROM
  Sells AS S
  INNER JOIN Paintings AS P ON S.Painting_ID = P.Painting_ID
WHERE
  S.Vendor_ID = param1
  AND P.Painting_ID IN (
    SELECT
      B.Painting_ID
    FROM
      Buys AS B )
ORDER BY Profit
LIMIT 1

-- Query 6 NEW 
SELECT
  Person.Name,
  Person.ID
FROM
  Person
WHERE
  Person.ID IN (
    SELECT
      Artist_ID
    FROM
      Paintings AS P1
    WHERE
      P1.Painting_ID IN (
        SELECT
          Painting_ID
        FROM
          Buys AS B1
        WHERE
          B1.Customer_ID IN(
            SELECT
              T1.Customer_ID
            FROM
              (
                SELECT
                  B.Customer_ID,
                  SUM(Price) AS TotAmount
                FROM
                  Buys AS B
                  INNER JOIN Paintings As P ON B.Painting_ID = P.Painting_ID
                GROUP BY
                  B.Customer_ID
                ORDER BY
                  TotAmount DESC
                LIMIT
                  1
              ) AS T1
          )
      )
  )

-- Query 7
SELECT
  COUNT(Painting_Title) AS NumRequests
FROM
  Requests
WHERE
  Painting_Title in (
    SELECT
      Title
    FROM
      Paintings
    WHERE
      Painting_ID in (
        SELECT
          Painting_ID
        FROM
          Stocks
        WHERE
          Auction_ID in (
            SELECT
              Auction_ID
            FROM
              Auction
            WHERE
              Date = (
                SELECT
                  MAX(Date)
                FROM
                  Auction
              )
          )
      )
  )

-- Query 8 NEW
SELECT
  COUNT(DISTINCT Customer_ID) AS NumVisitors
FROM
  Visits AS V
WHERE
  V.Date IN (
    SELECT
      T3.Date
    FROM
      (
        SELECT
          T2.Date,
          MAX(T2.DayProfit) AS DayProfit
        FROM
          (
            SELECT
              B.Date,
              SUM(Profit) AS DayProfit
            FROM
              Buys AS B
              INNER JOIN (
                SELECT
                  P.Painting_ID,
                  (Price - Sell_Price) AS Profit
                FROM
                  Paintings AS P
                  INNER JOIN Sells AS S ON P.Painting_ID = S.Painting_ID
              ) AS T1 ON B.Painting_ID = T1.Painting_ID
            GROUP BY
              DATE
          ) AS T2
      ) AS T3
  )

-- Query 9
SELECT
  P.Name
FROM
  Person AS P
WHERE
  P.ID IN (
    SELECT
      T2.Customer_ID
    FROM
      ( SELECT
          T1.Customer_ID,
          T1.NumVisits
        FROM
          (
            SELECT
              V.Customer_ID,
              COUNT(Date) AS NumVisits
            FROM
              Visits AS V
            GROUP BY
              Customer_ID
          ) AS T1
        WHERE
          T1.NumVisits >= 1
      ) AS T2
    WHERE
      T2.Customer_ID NOT IN (
        SELECT
          B.Customer_ID
        FROM
          Buys AS B
      )
  )

-- Query 10 NEW
Select
  S.Vendor_ID,
  Table2.Date
from
  Sells as S
  INNER JOIN (
    SELECT
      B1.Painting_ID as PID,
      B1.Date
    FROM
      Buys AS B1
      INNER JOIN Paintings AS P1 ON P1.Painting_ID = B1.Painting_ID
    WHERE
      B1.Date IN (
        SELECT
          Best_date.Date
        FROM
          ( SELECT
              B.Date,
              COUNT(DISTINCT Title) AS NumUniqueTitles
            FROM
              Buys As B
              INNER JOIN Paintings AS P ON P.Painting_ID = B.Painting_ID
            GROUP BY
              Date
            ORDER BY
              NumUniqueTitles DESC
            LIMIT
              1
          ) AS Best_date
      )
  ) as Table2 on S.Painting_ID = Table2.PID
