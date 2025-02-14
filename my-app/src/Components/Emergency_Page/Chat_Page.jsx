import React from 'react';
import './Chat_Page.css';
import 'mdb-ui-kit/css/mdb.min.css'; // Import MDB styles
import black from '../Assets/black.png'; // Adjust the path accordingly



export function ChatComponent() {
  return (
    <section>
      {/* Outer Div */}
      <div className="outer-div">
        {/* Title for Outer Div */}
        <h1>EMERGENCY MESSAGE</h1>

        {/* Inner Div */}
        <div className="inner-div">
          {/* Chat Messages */}
          <div className="chat-messages">
            <div className="d-flex flex-row justify-content-end">
              <div>
                <p className="small p-2 me-3 mb-1 custom-text rounded-3 custom-bg">
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
              </div>
              <img
                src={black}
                alt="avatar 1"
                style={{ width: '62px', height: '100%' }}
              />
            </div>

            <div className="d-flex flex-row justify-content-end">
              <div>
                <p className="small p-2 me-3 mb-1 custom-text rounded-3 custom-bg">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
              </div>
              <img
                src={black}
                alt="avatar 1"
                style={{ width: '62px', height: '100%' }}
              />
            </div>

            <div className="d-flex flex-row justify-content-end">
              <div>
                <p className="small p-2 me-3 mb-1 custom-text rounded-3 custom-bg">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
              </div>
              <img
                src={black}
                alt="avatar 1"
                style={{ width: '62px', height: '100%' }}
              />
            </div>

            <div className="d-flex flex-row justify-content-end">
              <div>
                <p className="small p-2 me-3 mb-1 custom-text rounded-3 custom-bg">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
              </div>
              <img
                src={black}
                alt="avatar 1"
                style={{ width: '62px', height: '100%' }}
              />
            </div>

            <div className="d-flex flex-row justify-content-end">
              <div>
                <p className="small p-2 me-3 mb-1 custom-text rounded-3 custom-bg">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
                <p className="small me-3 mb-3 rounded-3 text-muted">12:00 PM | Aug 13</p>
              </div>
              <img
                src={black}
                alt="avatar 1"
                style={{ width: '62px', height: '100%' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}