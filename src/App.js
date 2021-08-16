import { useState } from 'react';
import { makeStyles, Button, TextField } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  button: {
    marginLeft: 8,
    textTransform: 'none',
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});

const App = () => {
  const [list, setList] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isAscending, setIsAscending] = useState(true);

  const styles = useStyles();

  const addItem = (item) => {
    if (!item?.trim()) return;
    setList(list.concat([{ id: Math.random(), item }]));
    setNewItem('');
  };

  const compareAlphabeticalOrder = ({ item: a }, { item: b }) => {
    // note: isAscending translated to a before b and vice-versa
    for (let i = 0; i < a.length; i++) {
      // if there's no a left to traverse, a comes first
      if (a.length <= i) {
        return isAscending ? -1 : 1; // [a, b]
      // if there's no b left to traverse, b comes first
      } else if (b.length <= i) {
        return isAscending ? 1 : -1; // [b, a]
      // if a and b are equal, check next letter
      } else if (a.charCodeAt(i) === b.charCodeAt(i)) {
        continue;
      // if a before b, a comes first
      } else if (a.charCodeAt(i) < b.charCodeAt(i)) {
        return isAscending ? -1 : 1; // [a, b]
      // else, b before a, so b comes first
      } else {
        return isAscending ? 1 : -1;  // [b, a]
      }
    }
    return 0;
  };

  const sortList = () => {
    setList(list.sort(compareAlphabeticalOrder));
    setIsAscending(!isAscending);
  };

  return (
    <div className={styles.container}>
      <div className={styles.rowContainer}>
        <TextField
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem(newItem)}
        />
        <Button
          className={styles.button}
          onClick={sortList}
        >
          {isAscending ? 'Up' : 'Down'}
        </Button>
        <Button className={styles.button} onClick={() => {
          setNewItem('');
          setList([]);
        }}>
          Clear
        </Button>
      </div>
      <ul>
        {list.map((item) => <li key={item.id}>{item.item}</li>)}
      </ul>
    </div>
  );
};

export default App;
