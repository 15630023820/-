import req from '@/utils/request';
export const createLoan = (loanInfo) => {
    // /loan/create
    return req.post('/loan/create', loanInfo)
}
export const loanLost = pager => {
    return req.get('/loan/list', {
        params: pager
    })
}
export const rejectLoan = (id) => {
    return req.post('/approve/first/reject', {
        appId: id,
        loanId: id
    })
}
export const passLoan = (id) => {
    return req.post('/approve/first/pass', {
        appId: id,
        loanId: id
    })
}

export const rejectLoanEnd = (id) => {
    return req.post('/approve/end/reject', {
        appId: id,
        loanId: id
    })
}
export const passLoanEnd = id => {
    return req.post('/approve/end/pass', {
        appId: id,
        loanId: id
    })
}

export const getContractUrl = id => {
    return req.get('/contract/download', {
        params: { id }
    })
    .then(res=>{
        return res.data.data.url;
    })
}

export const downloadByUrl = url =>{
    // /api/contract/download/contract-94.docx
    const newUrl = url.replace('/api','');
    return  req.get(newUrl,{
        responseType:'blob',// new Blob([arrayBuffer])
    })
}