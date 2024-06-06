import notesStore from "../stores/notesStore";

export default function CreateForm() {

    const store = notesStore();

    //Use for toggle between create and update
    if(store.updateForm._id) return <></>;
    
    return (
        <div>
            <h2>Create Note:</h2>
            <form onSubmit={store.createNote}>
            <input onChange={store.updateCreateFormField} value={store.createForm.title} name="title"/>
            <textarea onChange={store.updateCreateFormField} value={store.createForm.body} name="body"/>
            <button type="submit">Create Note</button>
            </form>
        </div>
    );
}