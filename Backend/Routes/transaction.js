
const express=require("express")
const router=express.Router();
const cors=require('cors');
const app=express();
const incomeController=require('../Controller/Income');
const expenseController=require('../Controller/Expense');

app.use(cors());



router.post('/',incomeController.addIncome)
router.get('/income',incomeController.totalIncome)
router.get('/getIncome',incomeController.getIncome)
router.delete('/:id',incomeController.deleteIncome)
router.post('/expense',expenseController.addIncome)
router.get('/expense/getExpense',expenseController.getIncome)
router.delete('/expense/:id',expenseController.deleteIncome)
router.get('/total',expenseController.totalIncome)
router.get('/maxmin',incomeController.minMax)
router.get('/expense/maxmin',expenseController.minMax)
router.get('/expense/recent',incomeController.recentRecords)

module.exports=router;
