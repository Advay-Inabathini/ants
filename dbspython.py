import mysql.connector

# establish database connection
db = mysql.connector.connect(
  host="localhost",
  user="yourusername",
  password="yourpassword",
  database="attendance"
)

# create cursor
cursor = db.cursor()

# function to record attendance
def record_attendance(student_id, status):
    sql = "INSERT INTO attendance_records (student_id, status) VALUES (%s, %s)"
    val = (student_id, status)
    cursor.execute(sql, val)
    db.commit()

# function to retrieve all students
def get_all_students():
    sql = "SELECT * FROM students"
    cursor.execute(sql)
    return cursor.fetchall()

# function to retrieve attendance records by date
def get_attendance_by_date(date):
    sql = "SELECT * FROM attendance_records WHERE date = %s"
    val = (date,)
    cursor.execute(sql, val)
    return cursor.fetchall()

# close database connection
db.close()
