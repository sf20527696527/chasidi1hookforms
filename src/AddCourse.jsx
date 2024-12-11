import { useForm } from "react-hook-form";
import "./AddCourse.css"

const AddCourse = () => {

    let learningTypes = [
        { id: 1, name: "frontal" },
        { id: 2, name: "books" },
        { id: 3, name: "video" },
    ]
    //register---כותבים את זה על כל אינםו וכך גורמים 
    //שמה שיוקלד באינםוט ייכנס לאובייקט מאחורי הקלעים 
    //אחכ זה גם מאפשר לנו לקבוע בדיקות תקינות על שדה מסויים
    //name onChange value ....זה חוסך לנו לכתוב לכל אינפוט

    //handleSubmit---פונקציה שמטפלת בשליחה של הטוםס 
    //ומקבלת כפרמטר פונקציה אחרת להפעיל בעת השליחה 
    //היא מכיסה לפונקציה השניה באופן אוטומטי את הנתונים שהקלדו בטופס

    //errors-- אובייקט שמכיל את כל השגיאות אודות אינםוטים
    //שדות האובייקט הזה הם שמות האינפוים
    //כל שגיאה נשמרת כאובייקט עם סוג והודעה
    //אפשר לתת הודעה אך לא חובה
    //הטופס לא יוכל להשלח בלי שהכל תקין

    //isValid--האם הטופס תקין
    //מספיק שדה אחד לא תקין כדי לגרום לטופס להיות לא תקין
    let { register, handleSubmit, getValues, reset, formState: { errors, isValid } } = useForm({
        mode: "all", defaultValues: {
            name: "stam name"
        }
    });
    const save = (data) => {
        alert("פרטיך נשמרו בהצלחה" + JSON.stringify(data));
        reset();

    }
    console.log(errors)

    return (<form className="add-course-form" noValidate onSubmit={handleSubmit(save)}>

        <input {...register("name", { required: { value: true, message: "name is required" } })} type="text" placeholder="name" />

        {errors.name && <div className="err-msg">{errors.name.message}</div>}
        <input {...register("priceOfCourse", {
            min: { value: 100, message: "price minimum is 100" },
            max: { value: 100000, message: "value maximum 100000" },
            validate: {
                even: (v) => { return v % 2 == 0 || "price has to be even value" },
                lastDigit: (v) => { return v % 10 > 3 || "price has to be even value" }
            }
        })} type="number" placeholder="price" />

        {errors.priceOfCourse && <div className="err-msg">{errors.priceOfCourse.message}</div>}
        {/* {errors.priceOfCourse && errors.priceOfCourse.type == "min" && <div className="err-msg">price is too cheap</div>}
        {errors.priceOfCourse?.type == "max" && <div className="err-msg">price is too expensive</div>} */}

        <input {...register("date", { min: { value: "11/12/2024", message: "תאריך לא תקין" } })} type="date" placeholder="date" />
        {errors.date && <div className="err-msg">{errors.date.message}</div>}
        <input {...register("email", { pattern: /^[A-Za-z0-9]{5,10}@(co|com)$/ })} type="email" placeholder="mail" />
        {errors.email && <div className="err-msg">email is not in correct format</div>}
        <input {...register("emailConfirmation", {
            pattern:{value:/^[A-Za-z0-9]{5,10}@(co|com)$/,message:"not valid pattern"},
            validate: {
                notSame: (v) => {
                    return (v == getValues("email")) || "email confilct"
                }
            }
        })} type="email" placeholder="mail" />
        {errors.emailConfirmation && <div className="err-msg">{errors.emailConfirmation.message}</div>}
        <select {...register("type")} >
            {learningTypes.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
        <input type="submit" disabled={!isValid} />
    </form>);
}

export default AddCourse;
//open source-קוד פתוח
